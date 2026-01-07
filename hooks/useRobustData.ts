import { useEffect, useState } from 'react';
import { supabase } from '../src/integrations/supabase/client';
import { useAuth } from '../contexts/AuthContext';

export const useRobustData = () => {
  const { user } = useAuth();
  const [wallet, setWallet] = useState<any>(null);
  const [lessons, setLessons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      setLoading(true);
      
      // Fetch Wallet Data from robust schema
      const { data: walletData } = await supabase
        .from('wallets')
        .select('*')
        .eq('student_id', user.id)
        .single();
      
      if (walletData) setWallet(walletData);

      // Fetch Lessons with Subject data
      const { data: lessonsData } = await supabase
        .from('lessons')
        .select('*, subjects(name)')
        .eq('is_published', true);

      if (lessonsData) {
        // Map robust schema data to UI format
        const formattedLessons = lessonsData.map(lesson => ({
          id: lesson.id,
          title: lesson.title,
          subject: lesson.subjects?.name || 'General',
          duration: `${lesson.duration_minutes} min`,
          progress: 0, // In a real app, join with student_progress
          image: lesson.content?.type === 'vr_interactive' 
            ? 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&q=80&w=400' 
            : 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=400',
          isCBC: true
        }));
        setLessons(formattedLessons);
      }

      setLoading(false);
    };

    fetchData();

    // Subscribe to Realtime Wallet Updates
    const walletSubscription = supabase
      .channel('wallet-updates')
      .on('postgres_changes', { 
        event: 'UPDATE', 
        schema: 'public', 
        table: 'wallets',
        filter: `student_id=eq.${user.id}`
      }, (payload) => {
        setWallet(payload.new);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(walletSubscription);
    };
  }, [user]);

  return { wallet, lessons, loading };
};