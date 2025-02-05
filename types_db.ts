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
      customers: {
        Row: {
          id: string
          lemon_squeezy_customer_id: string | null
        }
        Insert: {
          id: string
          lemon_squeezy_customer_id?: string | null
        }
        Update: {
          id?: string
          lemon_squeezy_customer_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'customers_id_fkey'
            columns: ['id']
            isOneToOne: true
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      subscriptions: {
        Row: {
          id: number
          lemon_squeezy_id: string
          order_id: number
          name: string
          email: string
          status: Database['public']['Enums']['subscription_status']
          status_formatted: string
          renews_at: string | null
          ends_at: string | null
          trial_ends_at: string | null
          price: string
          is_usage_based: boolean
          is_paused: boolean
          subscription_item_id: number
          user_id: string
          plan_id: number
        }
        Insert: {
          lemon_squeezy_id: string
          order_id: number
          name: string
          email: string
          status: Database['public']['Enums']['subscription_status']
          status_formatted: string
          renews_at?: string | null
          ends_at?: string | null
          trial_ends_at?: string | null
          price: string
          is_usage_based?: boolean
          is_paused?: boolean
          subscription_item_id?: number
          user_id: string
          plan_id: number
        }
        Update: {
          id?: number
          lemon_squeezy_id?: string
          order_id?: number
          name?: string
          email?: string
          status?: Database['public']['Enums']['subscription_status']
          status_formatted?: string
          renews_at?: string | null
          ends_at?: string | null
          trial_ends_at?: string | null
          price?: string
          is_usage_based?: boolean
          is_paused?: boolean
          subscription_item_id?: number
          user_id?: string
          plan_id?: number
        }
        Relationships: [
          {
            foreignKeyName: 'subscriptions_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'subscriptions_plan_id_fkey'
            columns: ['plan_id']
            isOneToOne: false
            referencedRelation: 'plans'
            referencedColumns: ['id']
          },
        ]
      }
      users: {
        Row: {
          avatar_url: string | null
          billing_address: Json | null
          full_name: string | null
          id: string
          payment_method: Json | null
        }
        Insert: {
          avatar_url?: string | null
          billing_address?: Json | null
          full_name?: string | null
          id: string
          payment_method?: Json | null
        }
        Update: {
          avatar_url?: string | null
          billing_address?: Json | null
          full_name?: string | null
          id?: string
          payment_method?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: 'users_id_fkey'
            columns: ['id']
            isOneToOne: true
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      plans: {
        Row: {
          id: number
          product_id: number
          product_name: string | null
          variant_id: number
          name: string
          description: string | null
          price: string
          is_usage_based: boolean
          interval: string | null
          interval_count: number | null
          trial_interval: string | null
          trial_interval_count: number | null
          sort: number | null
        }
        Insert: {
          product_id: number
          product_name?: string | null
          variant_id: number
          name: string
          description?: string | null
          price: string
          is_usage_based?: boolean
          interval?: string | null
          interval_count?: number | null
          trial_interval?: string | null
          trial_interval_count?: number | null
          sort?: number | null
        }
        Update: {
          id?: number
          product_id?: number
          product_name?: string | null
          variant_id?: number
          name?: string
          description?: string | null
          price?: string
          is_usage_based?: boolean
          interval?: string | null
          interval_count?: number | null
          trial_interval?: string | null
          trial_interval_count?: number | null
          sort?: number | null
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
      subscription_status:
        | 'on_trial'
        | 'active'
        | 'paused'
        | 'past_due'
        | 'unpaid'
        | 'cancelled'
        | 'expired'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database['public']['Tables'] & Database['public']['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database['public']['Tables'] &
        Database['public']['Views'])
    ? (Database['public']['Tables'] &
        Database['public']['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database['public']['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
    ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database['public']['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
    ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database['public']['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof Database['public']['Enums']
    ? Database['public']['Enums'][PublicEnumNameOrOptions]
    : never
