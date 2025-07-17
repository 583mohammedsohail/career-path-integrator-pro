export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      campus_drive_applications: {
        Row: {
          applied_at: string | null
          campus_drive_id: string
          cover_letter: string | null
          id: string
          resume_url: string | null
          status: string | null
          student_id: string
        }
        Insert: {
          applied_at?: string | null
          campus_drive_id: string
          cover_letter?: string | null
          id?: string
          resume_url?: string | null
          status?: string | null
          student_id: string
        }
        Update: {
          applied_at?: string | null
          campus_drive_id?: string
          cover_letter?: string | null
          id?: string
          resume_url?: string | null
          status?: string | null
          student_id?: string
        }
        Relationships: []
      }
      campus_drives: {
        Row: {
          company_id: string | null
          company_logo: string | null
          company_name: string | null
          created_at: string | null
          date: string
          description: string
          eligibility_criteria: string | null
          id: string
          location: string
          positions: number
          registration_deadline: string | null
          requirements: string[] | null
          roles: string[] | null
          salary: string | null
          status: string | null
          title: string
        }
        Insert: {
          company_id?: string | null
          company_logo?: string | null
          company_name?: string | null
          created_at?: string | null
          date: string
          description: string
          eligibility_criteria?: string | null
          id?: string
          location: string
          positions?: number
          registration_deadline?: string | null
          requirements?: string[] | null
          roles?: string[] | null
          salary?: string | null
          status?: string | null
          title: string
        }
        Update: {
          company_id?: string | null
          company_logo?: string | null
          company_name?: string | null
          created_at?: string | null
          date?: string
          description?: string
          eligibility_criteria?: string | null
          id?: string
          location?: string
          positions?: number
          registration_deadline?: string | null
          requirements?: string[] | null
          roles?: string[] | null
          salary?: string | null
          status?: string | null
          title?: string
        }
        Relationships: []
      }
      companies: {
        Row: {
          company_name: string
          description: string | null
          id: string
          industry: string | null
          location: string | null
          website: string | null
        }
        Insert: {
          company_name: string
          description?: string | null
          id: string
          industry?: string | null
          location?: string | null
          website?: string | null
        }
        Update: {
          company_name?: string
          description?: string | null
          id?: string
          industry?: string | null
          location?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "companies_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      job_applications: {
        Row: {
          applied_at: string | null
          id: string
          job_id: string
          resume_url: string | null
          status: string | null
          student_id: string
        }
        Insert: {
          applied_at?: string | null
          id?: string
          job_id: string
          resume_url?: string | null
          status?: string | null
          student_id: string
        }
        Update: {
          applied_at?: string | null
          id?: string
          job_id?: string
          resume_url?: string | null
          status?: string | null
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "job_applications_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_applications_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      jobs: {
        Row: {
          company_id: string
          created_at: string | null
          deadline: string
          description: string
          id: string
          location: string | null
          positions: number | null
          requirements: string[] | null
          salary: string | null
          status: string | null
          title: string
        }
        Insert: {
          company_id: string
          created_at?: string | null
          deadline: string
          description: string
          id?: string
          location?: string | null
          positions?: number | null
          requirements?: string[] | null
          salary?: string | null
          status?: string | null
          title: string
        }
        Update: {
          company_id?: string
          created_at?: string | null
          deadline?: string
          description?: string
          id?: string
          location?: string | null
          positions?: number | null
          requirements?: string[] | null
          salary?: string | null
          status?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "jobs_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string | null
          id: string
          is_read: boolean | null
          message: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          id: string
          name: string | null
          role: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          id: string
          name?: string | null
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          name?: string | null
          role?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      student_attendance: {
        Row: {
          date: string
          id: string
          marked_at: string | null
          marked_by: string | null
          notes: string | null
          status: string
          student_id: string
        }
        Insert: {
          date?: string
          id?: string
          marked_at?: string | null
          marked_by?: string | null
          notes?: string | null
          status?: string
          student_id: string
        }
        Update: {
          date?: string
          id?: string
          marked_at?: string | null
          marked_by?: string | null
          notes?: string | null
          status?: string
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "student_attendance_marked_by_fkey"
            columns: ["marked_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_attendance_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      students: {
        Row: {
          cgpa: number
          course: string
          department: string
          id: string
          resume_url: string | null
          roll_number: string
          skills: string[] | null
          year: number
        }
        Insert: {
          cgpa: number
          course: string
          department: string
          id: string
          resume_url?: string | null
          roll_number: string
          skills?: string[] | null
          year: number
        }
        Update: {
          cgpa?: number
          course?: string
          department?: string
          id?: string
          resume_url?: string | null
          roll_number?: string
          skills?: string[] | null
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "students_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      system_audit: {
        Row: {
          action_type: string
          created_at: string | null
          details: Json | null
          entity_id: string | null
          entity_type: string
          id: string
          user_id: string | null
        }
        Insert: {
          action_type: string
          created_at?: string | null
          details?: Json | null
          entity_id?: string | null
          entity_type: string
          id?: string
          user_id?: string | null
        }
        Update: {
          action_type?: string
          created_at?: string | null
          details?: Json | null
          entity_id?: string | null
          entity_type?: string
          id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      system_notifications: {
        Row: {
          created_at: string | null
          created_by: string | null
          expires_at: string | null
          id: string
          is_active: boolean | null
          message: string
          target_users: string[] | null
          title: string
          type: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          message: string
          target_users?: string[] | null
          title: string
          type?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          message?: string
          target_users?: string[] | null
          title?: string
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "system_notifications_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      system_settings: {
        Row: {
          allow_registration: boolean | null
          application_deadline_buffer: number | null
          auto_approve_companies: boolean | null
          data_retention_days: number | null
          email_notifications: boolean | null
          id: string
          maintenance_mode: boolean | null
          max_applications_per_student: number | null
          max_jobs_per_company: number | null
          updated_at: string | null
        }
        Insert: {
          allow_registration?: boolean | null
          application_deadline_buffer?: number | null
          auto_approve_companies?: boolean | null
          data_retention_days?: number | null
          email_notifications?: boolean | null
          id?: string
          maintenance_mode?: boolean | null
          max_applications_per_student?: number | null
          max_jobs_per_company?: number | null
          updated_at?: string | null
        }
        Update: {
          allow_registration?: boolean | null
          application_deadline_buffer?: number | null
          auto_approve_companies?: boolean | null
          data_retention_days?: number | null
          email_notifications?: boolean | null
          id?: string
          maintenance_mode?: boolean | null
          max_applications_per_student?: number | null
          max_jobs_per_company?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      user_sessions: {
        Row: {
          id: string
          ip_address: unknown | null
          is_active: boolean | null
          last_activity: string | null
          session_end: string | null
          session_start: string | null
          user_agent: string | null
          user_id: string
        }
        Insert: {
          id?: string
          ip_address?: unknown | null
          is_active?: boolean | null
          last_activity?: string | null
          session_end?: string | null
          session_start?: string | null
          user_agent?: string | null
          user_id: string
        }
        Update: {
          id?: string
          ip_address?: unknown | null
          is_active?: boolean | null
          last_activity?: string | null
          session_end?: string | null
          session_start?: string | null
          user_agent?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_sessions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_active_user_count: {
        Args: Record<PropertyKey, never>
        Returns: {
          total_count: number
          active_last_day: number
          active_last_week: number
          active_last_month: number
        }[]
      }
      get_active_users_realtime: {
        Args: Record<PropertyKey, never>
        Returns: {
          total_users: number
          active_now: number
          active_today: number
          students_online: number
          companies_online: number
        }[]
      }
      update_user_activity: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
