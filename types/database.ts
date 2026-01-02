export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          role: 'student' | 'parent' | 'teacher' | 'admin';
          avatar_url: string | null;
          neurodivergent_mode_enabled: boolean;
          created_at: string;
          updated_at: string;
          school_id: string | null;
          grade_level: number | null;
          parent_phone: string | null;
          emergency_contact: string | null;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          role: 'student' | 'parent' | 'teacher' | 'admin';
          avatar_url?: string | null;
          neurodivergent_mode_enabled?: boolean;
          created_at?: string;
          updated_at?: string;
          school_id?: string | null;
          grade_level?: number | null;
          parent_phone?: string | null;
          emergency_contact?: string | null;
        };
        Update: {
          id?: string;
          full_name?: string | null;
          role?: 'student' | 'parent' | 'teacher' | 'admin';
          avatar_url?: string | null;
          neurodivergent_mode_enabled?: boolean;
          created_at?: string;
          updated_at?: string;
          school_id?: string | null;
          grade_level?: number | null;
          parent_phone?: string | null;
          emergency_contact?: string | null;
        };
      };
      lessons: {
        Row: {
          id: string;
          title: string;
          subject: string;
          strand: string;
          sub_strand: string;
          grade_level: number;
          duration_minutes: number;
          content_url: string | null;
          video_url: string | null;
          interactive_elements: any | null;
          is_published: boolean;
          created_by: string;
          created_at: string;
          updated_at: string;
          description: string | null;
          learning_objectives: string[] | null;
          prerequisites: string[] | null;
        };
        Insert: {
          id?: string;
          title: string;
          subject: string;
          strand: string;
          sub_strand: string;
          grade_level: number;
          duration_minutes: number;
          content_url?: string | null;
          video_url?: string | null;
          interactive_elements?: any | null;
          is_published?: boolean;
          created_by: string;
          created_at?: string;
          updated_at?: string;
          description?: string | null;
          learning_objectives?: string[] | null;
          prerequisites?: string[] | null;
        };
        Update: {
          id?: string;
          title?: string;
          subject?: string;
          strand?: string;
          sub_strand?: string;
          grade_level?: number;
          duration_minutes?: number;
          content_url?: string | null;
          video_url?: string | null;
          interactive_elements?: any | null;
          is_published?: boolean;
          created_by?: string;
          created_at?: string;
          updated_at?: string;
          description?: string | null;
          learning_objectives?: string[] | null;
          prerequisites?: string[] | null;
        };
      };
      student_progress: {
        Row: {
          id: string;
          student_id: string;
          lesson_id: string;
          progress_percentage: number;
          time_spent_minutes: number;
          last_accessed: string;
          completed_at: string | null;
          mastery_level: number | null;
          evidence_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          student_id: string;
          lesson_id: string;
          progress_percentage?: number;
          time_spent_minutes?: number;
          last_accessed?: string;
          completed_at?: string | null;
          mastery_level?: number | null;
          evidence_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          student_id?: string;
          lesson_id?: string;
          progress_percentage?: number;
          time_spent_minutes?: number;
          last_accessed?: string;
          completed_at?: string | null;
          mastery_level?: number | null;
          evidence_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      assessments: {
        Row: {
          id: string;
          lesson_id: string;
          title: string;
          type: 'quiz' | 'assignment' | 'project' | 'vr_simulation';
          questions: any;
          total_points: number;
          time_limit_minutes: number | null;
          is_published: boolean;
          created_by: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          lesson_id: string;
          title: string;
          type: 'quiz' | 'assignment' | 'project' | 'vr_simulation';
          questions: any;
          total_points: number;
          time_limit_minutes?: number | null;
          is_published?: boolean;
          created_by: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          lesson_id?: string;
          title?: string;
          type?: 'quiz' | 'assignment' | 'project' | 'vr_simulation';
          questions?: any;
          total_points?: number;
          time_limit_minutes?: number | null;
          is_published?: boolean;
          created_by?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      assessment_results: {
        Row: {
          id: string;
          assessment_id: string;
          student_id: string;
          answers: any;
          score: number;
          max_score: number;
          time_taken_minutes: number;
          submitted_at: string;
          feedback: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          assessment_id: string;
          student_id: string;
          answers: any;
          score: number;
          max_score: number;
          time_taken_minutes: number;
          submitted_at?: string;
          feedback?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          assessment_id?: string;
          student_id?: string;
          answers?: any;
          score?: number;
          max_score?: number;
          time_taken_minutes?: number;
          submitted_at?: string;
          feedback?: string | null;
          created_at?: string;
        };
      };
      wallets: {
        Row: {
          student_id: string;
          balance: number;
          total_earned: number;
          total_spent: number;
          streak_count: number;
          last_activity: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          student_id: string;
          balance?: number;
          total_earned?: number;
          total_spent?: number;
          streak_count?: number;
          last_activity?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          student_id?: string;
          balance?: number;
          total_earned?: number;
          total_spent?: number;
          streak_count?: number;
          last_activity?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      learncoin_transactions: {
        Row: {
          id: string;
          student_id: string;
          amount: number;
          transaction_type: 'earned' | 'spent' | 'bonus' | 'penalty';
          source: string;
          description: string | null;
          reference_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          student_id: string;
          amount: number;
          transaction_type: 'earned' | 'spent' | 'bonus' | 'penalty';
          source: string;
          description?: string | null;
          reference_id?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          student_id?: string;
          amount?: number;
          transaction_type?: 'earned' | 'spent' | 'bonus' | 'penalty';
          source?: string;
          description?: string | null;
          reference_id?: string | null;
          created_at?: string;
        };
      };
      quests: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          reward_lc: number;
          quest_type: 'daily' | 'weekly' | 'special' | 'family';
          requirements: any;
          is_active: boolean;
          start_date: string | null;
          end_date: string | null;
          created_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          reward_lc: number;
          quest_type: 'daily' | 'weekly' | 'special' | 'family';
          requirements: any;
          is_active?: boolean;
          start_date?: string | null;
          end_date?: string | null;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          reward_lc?: number;
          quest_type?: 'daily' | 'weekly' | 'special' | 'family';
          requirements?: any;
          is_active?: boolean;
          start_date?: string | null;
          end_date?: string | null;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      family_links: {
        Row: {
          parent_id: string;
          student_id: string;
          relationship: string | null;
          is_primary: boolean;
          permissions: any | null;
          created_at: string;
        };
        Insert: {
          parent_id: string;
          student_id: string;
          relationship?: string | null;
          is_primary?: boolean;
          permissions?: any | null;
          created_at?: string;
        };
        Update: {
          parent_id?: string;
          student_id?: string;
          relationship?: string | null;
          is_primary?: boolean;
          permissions?: any | null;
          created_at?: string;
        };
      };
      chores: {
        Row: {
          id: string;
          family_link_id: string;
          title: string;
          description: string | null;
          reward_lc: number;
          difficulty_level: number;
          estimated_duration: number | null;
          is_active: boolean;
          created_by: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          family_link_id: string;
          title: string;
          description?: string | null;
          reward_lc: number;
          difficulty_level: number;
          estimated_duration?: number | null;
          is_active?: boolean;
          created_by: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          family_link_id?: string;
          title?: string;
          description?: string | null;
          reward_lc?: number;
          difficulty_level?: number;
          estimated_duration?: number | null;
          is_active?: boolean;
          created_by?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      chore_completions: {
        Row: {
          id: string;
          chore_id: string;
          student_id: string;
          completed_at: string;
          verified_by: string | null;
          verified_at: string | null;
          rating: number | null;
          feedback: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          chore_id: string;
          student_id: string;
          completed_at?: string;
          verified_by?: string | null;
          verified_at?: string | null;
          rating?: number | null;
          feedback?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          chore_id?: string;
          student_id?: string;
          completed_at?: string;
          verified_by?: string | null;
          verified_at?: string | null;
          rating?: number | null;
          feedback?: string | null;
          created_at?: string;
        };
      };
      attention_sessions: {
        Row: {
          id: string;
          student_id: string;
          session_start: string;
          session_end: string | null;
          attention_scores: number[] | null;
          distraction_events: number | null;
          engagement_level: 'high' | 'medium' | 'low';
          activities_performed: string[] | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          student_id: string;
          session_start?: string;
          session_end?: string | null;
          attention_scores?: number[] | null;
          distraction_events?: number | null;
          engagement_level?: 'high' | 'medium' | 'low';
          activities_performed?: string[] | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          student_id?: string;
          session_start?: string;
          session_end?: string | null;
          attention_scores?: number[] | null;
          distraction_events?: number | null;
          engagement_level?: 'high' | 'medium' | 'low';
          activities_performed?: string[] | null;
          created_at?: string;
        };
      };
      offline_content: {
        Row: {
          id: string;
          content_type: 'lesson' | 'video' | 'assessment' | 'vr_asset';
          content_id: string;
          file_url: string | null;
          local_path: string | null;
          file_size: number | null;
          downloaded_at: string | null;
          expires_at: string | null;
          is_cached: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          content_type: 'lesson' | 'video' | 'assessment' | 'vr_asset';
          content_id: string;
          file_url?: string | null;
          local_path?: string | null;
          file_size?: number | null;
          downloaded_at?: string | null;
          expires_at?: string | null;
          is_cached?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          content_type?: 'lesson' | 'video' | 'assessment' | 'vr_asset';
          content_id?: string;
          file_url?: string | null;
          local_path?: string | null;
          file_size?: number | null;
          downloaded_at?: string | null;
          expires_at?: string | null;
          is_cached?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      user_role: 'student' | 'parent' | 'teacher' | 'admin';
      quest_type: 'daily' | 'weekly' | 'special' | 'family';
      transaction_type: 'earned' | 'spent' | 'bonus' | 'penalty';
      assessment_type: 'quiz' | 'assignment' | 'project' | 'vr_simulation';
      engagement_level: 'high' | 'medium' | 'low';
      content_type: 'lesson' | 'video' | 'assessment' | 'vr_asset';
    };
  };
}
