export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      analytics: {
        Row: {
          event_type: string
          id: string
          landing_page_id: string | null
          timestamp: string | null
          user_agent: string | null
          user_id: string
          visitor_ip: string | null
        }
        Insert: {
          event_type: string
          id?: string
          landing_page_id?: string | null
          timestamp?: string | null
          user_agent?: string | null
          user_id: string
          visitor_ip?: string | null
        }
        Update: {
          event_type?: string
          id?: string
          landing_page_id?: string | null
          timestamp?: string | null
          user_agent?: string | null
          user_id?: string
          visitor_ip?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "analytics_landing_page_id_fkey"
            columns: ["landing_page_id"]
            isOneToOne: false
            referencedRelation: "landing_pages"
            referencedColumns: ["id"]
          },
        ]
      }
      deal_images: {
        Row: {
          created_at: string | null
          id: string
          image_data: string | null
          overlay_text: string | null
          template_settings: Json | null
          title: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          image_data?: string | null
          overlay_text?: string | null
          template_settings?: Json | null
          title?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          image_data?: string | null
          overlay_text?: string | null
          template_settings?: Json | null
          title?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      landing_pages: {
        Row: {
          conversion_rate: number | null
          created_at: string | null
          id: string
          is_published: boolean | null
          page_html: string
          page_title: string
          page_url: string | null
          proposal_id: string | null
          template_id: string | null
          updated_at: string | null
          user_id: string
          view_count: number | null
        }
        Insert: {
          conversion_rate?: number | null
          created_at?: string | null
          id?: string
          is_published?: boolean | null
          page_html: string
          page_title: string
          page_url?: string | null
          proposal_id?: string | null
          template_id?: string | null
          updated_at?: string | null
          user_id: string
          view_count?: number | null
        }
        Update: {
          conversion_rate?: number | null
          created_at?: string | null
          id?: string
          is_published?: boolean | null
          page_html?: string
          page_title?: string
          page_url?: string | null
          proposal_id?: string | null
          template_id?: string | null
          updated_at?: string | null
          user_id?: string
          view_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "landing_pages_proposal_id_fkey"
            columns: ["proposal_id"]
            isOneToOne: false
            referencedRelation: "sales_proposals"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string
          full_name: string | null
          id: string
          subscription_plan: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email: string
          full_name?: string | null
          id: string
          subscription_plan?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string
          full_name?: string | null
          id?: string
          subscription_plan?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      sales_proposals: {
        Row: {
          created_at: string | null
          discount_price: number | null
          id: string
          original_price: number | null
          pdf_data: string | null
          product_description: string | null
          product_name: string
          template_id: string | null
          updated_at: string | null
          urgency_hours: number | null
          user_id: string
          whatsapp_number: string | null
        }
        Insert: {
          created_at?: string | null
          discount_price?: number | null
          id?: string
          original_price?: number | null
          pdf_data?: string | null
          product_description?: string | null
          product_name: string
          template_id?: string | null
          updated_at?: string | null
          urgency_hours?: number | null
          user_id: string
          whatsapp_number?: string | null
        }
        Update: {
          created_at?: string | null
          discount_price?: number | null
          id?: string
          original_price?: number | null
          pdf_data?: string | null
          product_description?: string | null
          product_name?: string
          template_id?: string | null
          updated_at?: string | null
          urgency_hours?: number | null
          user_id?: string
          whatsapp_number?: string | null
        }
        Relationships: []
      }
      templates: {
        Row: {
          category: string
          created_at: string | null
          description: string | null
          id: string
          is_premium: boolean | null
          name: string
          preview_image: string | null
          template_data: Json
        }
        Insert: {
          category: string
          created_at?: string | null
          description?: string | null
          id?: string
          is_premium?: boolean | null
          name: string
          preview_image?: string | null
          template_data: Json
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string | null
          id?: string
          is_premium?: boolean | null
          name?: string
          preview_image?: string | null
          template_data?: Json
        }
        Relationships: []
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
