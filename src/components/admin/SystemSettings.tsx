import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import {
  Shield,
  Mail,
  Bell,
  Calendar,
  Lock,
  Database,
  RefreshCw,
  HardDrive
} from 'lucide-react';

interface SystemSettingsProps {
  settings: {
    allowRegistration: boolean;
    emailNotifications: boolean;
    maintenanceMode: boolean;
    autoApproveCompanies: boolean;
    maxApplicationsPerStudent: number;
    maxJobsPerCompany: number;
    applicationDeadlineBuffer: number;
    dataRetentionDays: number;
  };
  onUpdateSettings: (settings: any) => void;
}

const SystemSettings: React.FC<SystemSettingsProps> = ({ settings, onUpdateSettings }) => {
  const [currentSettings, setCurrentSettings] = useState(settings);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleSetting = (key: string) => {
    setCurrentSettings(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  const handleNumberChange = (key: string, value: string) => {
    setCurrentSettings(prev => ({
      ...prev,
      [key]: parseInt(value) || 0
    }));
  };

  const handleSaveSettings = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('system_settings')
        .upsert([currentSettings]);

      if (error) throw error;
      
      onUpdateSettings(currentSettings);
      toast.success('Settings updated successfully');
    } catch (error) {
      toast.error('Failed to update settings');
    } finally {
      setIsLoading(false);
    }
  };

  const settingsGroups = [
    {
      title: 'General Settings',
      icon: Shield,
      settings: [
        {
          key: 'allowRegistration',
          label: 'Allow New Registrations',
          description: 'Enable or disable new user registrations',
          type: 'switch',
        },
        {
          key: 'maintenanceMode',
          label: 'Maintenance Mode',
          description: 'Put the system in maintenance mode',
          type: 'switch',
        },
      ],
    },
    {
      title: 'Notification Settings',
      icon: Bell,
      settings: [
        {
          key: 'emailNotifications',
          label: 'Email Notifications',
          description: 'Enable system-wide email notifications',
          type: 'switch',
        },
      ],
    },
    {
      title: 'Application Settings',
      icon: Calendar,
      settings: [
        {
          key: 'autoApproveCompanies',
          label: 'Auto-approve Companies',
          description: 'Automatically approve new company registrations',
          type: 'switch',
        },
        {
          key: 'maxApplicationsPerStudent',
          label: 'Max Applications per Student',
          description: 'Maximum number of active applications allowed per student',
          type: 'number',
        },
        {
          key: 'maxJobsPerCompany',
          label: 'Max Jobs per Company',
          description: 'Maximum number of active job postings allowed per company',
          type: 'number',
        },
        {
          key: 'applicationDeadlineBuffer',
          label: 'Application Deadline Buffer (days)',
          description: 'Minimum days before job application deadline',
          type: 'number',
        },
      ],
    },
    {
      title: 'Data Management',
      icon: Database,
      settings: [
        {
          key: 'dataRetentionDays',
          label: 'Data Retention Period (days)',
          description: 'Number of days to retain inactive data',
          type: 'number',
        },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      {settingsGroups.map((group, index) => (
        <Card key={index}>
          <CardHeader>
            <div className="flex items-center gap-2">
              <group.icon className="h-5 w-5 text-primary" />
              <CardTitle>{group.title}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {group.settings.map((setting, settingIndex) => (
              <div key={settingIndex} className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor={setting.key}>{setting.label}</Label>
                    <p className="text-sm text-muted-foreground">
                      {setting.description}
                    </p>
                  </div>
                  {setting.type === 'switch' ? (
                    <Switch
                      id={setting.key}
                      checked={currentSettings[setting.key as keyof typeof currentSettings] as boolean}
                      onCheckedChange={() => handleToggleSetting(setting.key)}
                    />
                  ) : (
                    <Input
                      id={setting.key}
                      type="number"
                      className="w-24"
                      value={currentSettings[setting.key as keyof typeof currentSettings]}
                      onChange={(e) => handleNumberChange(setting.key, e.target.value)}
                    />
                  )}
                </div>
                {settingIndex < group.settings.length - 1 && (
                  <Separator className="my-2" />
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
      
      <div className="flex justify-end">
        <Button onClick={handleSaveSettings} disabled={isLoading}>
          {isLoading ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            'Save Settings'
          )}
        </Button>
      </div>
    </div>
  );
};

export default SystemSettings; 