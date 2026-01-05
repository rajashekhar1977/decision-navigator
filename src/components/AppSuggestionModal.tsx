import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Lightbulb, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface AppSuggestionModalProps {
  trigger?: React.ReactNode;
}

export function AppSuggestionModal({ trigger }: AppSuggestionModalProps) {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    appName: '',
    description: '',
    features: '',
    useCase: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.appName || !formData.description) return;

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const { error: insertError } = await supabase
        .from('app_suggestions')
        .insert([
          {
            user_id: user?.id || null,
            user_email: user?.email || 'anonymous',
            app_name: formData.appName,
            description: formData.description,
            features: formData.features,
            use_case: formData.useCase,
          },
        ]);

      if (insertError) throw insertError;

      setSuccess(true);
      setFormData({
        appName: '',
        description: '',
        features: '',
        useCase: '',
      });

      setTimeout(() => {
        setOpen(false);
        setSuccess(false);
      }, 2000);
    } catch (err) {
      console.error('Error submitting suggestion:', err);
      setError('Failed to submit your suggestion. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="lg">
            <Lightbulb className="h-5 w-5 mr-2" />
            Suggest an App
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="glass-strong border border-white/30 dark:border-white/20 max-w-2xl">
        <DialogHeader>
          <DialogTitle>Suggest an App Idea</DialogTitle>
          <DialogDescription>
            Have an idea for a micro-app that could help people? Share it with us!
          </DialogDescription>
        </DialogHeader>

        {success ? (
          <Alert className="bg-green-500/10 border-green-500/50 text-green-700 dark:text-green-400">
            <AlertDescription>
              Thank you for your suggestion! We'll review it and consider it for future development.
            </AlertDescription>
          </Alert>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="appName">App Name *</Label>
              <Input
                id="appName"
                placeholder="e.g., Study Planner Pro"
                value={formData.appName}
                onChange={(e) => setFormData({ ...formData, appName: e.target.value })}
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                placeholder="What does this app do? What problem does it solve?"
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="features">Key Features (Optional)</Label>
              <Textarea
                id="features"
                placeholder="List the main features (one per line)"
                rows={3}
                value={formData.features}
                onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="useCase">Use Case (Optional)</Label>
              <Textarea
                id="useCase"
                placeholder="How would you use this app in your daily life?"
                rows={3}
                value={formData.useCase}
                onChange={(e) => setFormData({ ...formData, useCase: e.target.value })}
                disabled={loading}
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-primary to-purple-600"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Suggestion'
              )}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
