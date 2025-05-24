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
        Relationships: []
      }
      profiles: {
        Row: {
          id: string
          name: string
          email: string
          role: string
          avatar_url: string | null
          department: string | null
          year: string | null
          course: string | null
          cgpa: string | null
          skills: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          name: string
          email: string
          role: string
          avatar_url?: string | null
          department?: string | null
          year?: string | null
          course?: string | null
          cgpa?: string | null
          skills?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          role?: string
          avatar_url?: string | null
          department?: string | null
          year?: string | null
          course?: string | null
          cgpa?: string | null
          skills?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      job_applications: {
        Row: {
          id: string
          job_id: string
          student_id: string
          status: string | null
          resume_url: string | null
          applied_at: string | null
        }
        Insert: {
          id?: string
          job_id: string
          student_id: string
          status?: string | null
          resume_url?: string | null
          applied_at?: string | null
        }
        Update: {
          id?: string
          job_id?: string
          student_id?: string
          status?: string | null
          resume_url?: string | null
          applied_at?: string | null
        }
        Relationships: []
      }
      jobs: {
        Row: {
          id: string
          title: string
          company_id: string
          location: string
          salary: string | null
          description: string
          requirements: string[] | null
          deadline: string | null
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          company_id: string
          location: string
          salary?: string | null
          description: string
          requirements?: string[] | null
          deadline?: string | null
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          company_id?: string
          location?: string
          salary?: string | null
          description?: string
          requirements?: string[] | null
          deadline?: string | null
          status?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      students: {
        Row: {
          id: string
          name: string
          email: string
          department: string | null
          year: string | null
          cgpa: string | null
          resume_url: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id: string
          name: string
          email: string
          department?: string | null
          year?: string | null
          cgpa?: string | null
          resume_url?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          email?: string
          department?: string | null
          year?: string | null
          cgpa?: string | null
          resume_url?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          title: string
          message: string
          is_read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          message: string
          is_read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          message?: string
          is_read?: boolean
          created_at?: string
        }
        Relationships: []
      }
      system_audit: {
        Row: {
          id: string
          action: string
          user_id: string | null
          details: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          action: string
          user_id?: string | null
          details?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          action?: string
          user_id?: string | null
          details?: Json | null
          created_at?: string
        }
        Relationships: []
      }
      system_settings: {
        Row: {
          id: string
          setting_key: string
          setting_value: string
          updated_at: string
        }
        Insert: {
          id?: string
          setting_key: string
          setting_value: string
          updated_at?: string
        }
        Update: {
          id?: string
          setting_key?: string
          setting_value?: string
          updated_at?: string
        }
        Relationships: []
      }
      campus_drives: {
        Row: {
          id: string
          title: string
          company_id: string
          location: string
          date: string
          description: string
          eligibility_criteria: string | null
          positions: number
          status: 'upcoming' | 'ongoing' | 'completed'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          company_id: string
          location: string
          date: string
          description: string
          eligibility_criteria?: string | null
          positions?: number
          status?: 'upcoming' | 'ongoing' | 'completed'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          company_id?: string
          location?: string
          date?: string
          description?: string
          eligibility_criteria?: string | null
          positions?: number
          status?: 'upcoming' | 'ongoing' | 'completed'
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "campus_drives_company_id_fkey"
            columns: ["company_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      campus_applications: {
        Row: {
          id: string
          drive_id: string
          student_id: string
          status: 'pending' | 'shortlisted' | 'rejected' | 'interview' | 'selected'
          note: string | null
          resume_url: string | null
          applied_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          drive_id: string
          student_id: string
          status?: 'pending' | 'shortlisted' | 'rejected' | 'interview' | 'selected'
          note?: string | null
          resume_url?: string | null
          applied_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          drive_id?: string
          student_id?: string
          status?: 'pending' | 'shortlisted' | 'rejected' | 'interview' | 'selected'
          note?: string | null
          resume_url?: string | null
          applied_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "campus_applications_drive_id_fkey"
            columns: ["drive_id"]
            referencedRelation: "campus_drives"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campus_applications_student_id_fkey"
            columns: ["student_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
