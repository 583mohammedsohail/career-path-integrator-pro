export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      announcements: {
        Row: {
          id: string
          title: string
          message: string
          created_by: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          message: string
          created_by: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          message?: string
          created_by?: string
          created_at?: string
          updated_at?: string
        }
      }
      companies: {
        Row: {
          id: string
          company_name: string
          description: string | null
          logo_url: string | null
          website: string | null
          location: string | null
          industry: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          company_name: string
          description?: string | null
          logo_url?: string | null
          website?: string | null
          location?: string | null
          industry?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          company_name?: string
          description?: string | null
          logo_url?: string | null
          website?: string | null
          location?: string | null
          industry?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      jobs: {
        Row: {
          id: string
          title: string
          company_id: string
          location: string
          salary: string
          description: string
          requirements: string[]
          deadline: string
          status: 'open' | 'closed'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          company_id: string
          location: string
          salary: string
          description: string
          requirements: string[]
          deadline: string
          status?: 'open' | 'closed'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          company_id?: string
          location?: string
          salary?: string
          description?: string
          requirements?: string[]
          deadline?: string
          status?: 'open' | 'closed'
          created_at?: string
          updated_at?: string
        }
      }
      job_applications: {
        Row: {
          id: string
          job_id: string
          student_id: string
          status: 'pending' | 'selected' | 'rejected' | 'interviewing'
          resume_url: string | null
          applied_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          job_id: string
          student_id: string
          status?: 'pending' | 'selected' | 'rejected' | 'interviewing'
          resume_url?: string | null
          applied_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          job_id?: string
          student_id?: string
          status?: 'pending' | 'selected' | 'rejected' | 'interviewing'
          resume_url?: string | null
          applied_at?: string
          updated_at?: string
        }
      }
      students: {
        Row: {
          id: string
          name: string
          email: string
          avatar_url: string | null
          department: string
          year: number
          cgpa: number
          resume_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          avatar_url?: string | null
          department: string
          year: number
          cgpa: number
          resume_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          avatar_url?: string | null
          department?: string
          year?: number
          cgpa?: number
          resume_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      system_settings: {
        Row: {
          id: string
          allow_registration: boolean
          email_notifications: boolean
          maintenance_mode: boolean
          auto_approve_companies: boolean
          max_applications_per_student: number
          max_jobs_per_company: number
          application_deadline_buffer: number
          data_retention_days: number
          updated_at: string
        }
        Insert: {
          id?: string
          allow_registration?: boolean
          email_notifications?: boolean
          maintenance_mode?: boolean
          auto_approve_companies?: boolean
          max_applications_per_student?: number
          max_jobs_per_company?: number
          application_deadline_buffer?: number
          data_retention_days?: number
          updated_at?: string
        }
        Update: {
          id?: string
          allow_registration?: boolean
          email_notifications?: boolean
          maintenance_mode?: boolean
          auto_approve_companies?: boolean
          max_applications_per_student?: number
          max_jobs_per_company?: number
          application_deadline_buffer?: number
          data_retention_days?: number
          updated_at?: string
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          title: string
          message: string
          read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          message: string
          read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          message?: string
          read?: boolean
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
} 