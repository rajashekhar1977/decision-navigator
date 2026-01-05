import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Habit } from '@/types/habit';
import { Plus } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

interface AddHabitModalProps {
  onAdd: (habit: Habit) => void;
}

const habitIcons = ['💪', '📚', '🧘', '🏃', '💧', '🥗', '😴', '🎨', '✍️', '🎵', '🧠', '❤️'];
const habitColors = [
  'from-purple-500 to-pink-500',
  'from-blue-500 to-cyan-500',
  'from-green-500 to-emerald-500',
  'from-orange-500 to-red-500',
  'from-indigo-500 to-purple-500',
  'from-pink-500 to-rose-500',
];

export function AddHabitModal({ onAdd }: AddHabitModalProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon: habitIcons[0],
    color: habitColors[0],
    frequency: 'daily' as 'daily' | 'weekly',
    target: '1',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    const habit: Habit = {
      id: uuidv4(),
      name: formData.name,
      description: formData.description,
      icon: formData.icon,
      color: formData.color,
      frequency: formData.frequency,
      target: parseInt(formData.target),
      completions: [],
      createdAt: new Date().toISOString(),
    };

    onAdd(habit);
    setFormData({
      name: '',
      description: '',
      icon: habitIcons[0],
      color: habitColors[0],
      frequency: 'daily',
      target: '1',
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg">
          <Plus className="h-5 w-5 mr-2" />
          Add Habit
        </Button>
      </DialogTrigger>
      <DialogContent className="glass-strong border border-white/30 dark:border-white/20 max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Habit</DialogTitle>
          <DialogDescription>
            Build a new positive habit to track daily.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="habit-name">Habit Name</Label>
            <Input
              id="habit-name"
              placeholder="e.g., Morning Exercise"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (optional)</Label>
            <Textarea
              id="description"
              placeholder="Why is this habit important to you?"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={2}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Icon</Label>
              <Select value={formData.icon} onValueChange={(value) => setFormData({ ...formData, icon: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {habitIcons.map((icon) => (
                    <SelectItem key={icon} value={icon}>
                      <span className="text-2xl">{icon}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Color</Label>
              <Select value={formData.color} onValueChange={(value) => setFormData({ ...formData, color: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {habitColors.map((color, index) => (
                    <SelectItem key={color} value={color}>
                      <div className={`w-20 h-6 rounded bg-gradient-to-r ${color}`} />
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="frequency">Frequency</Label>
            <Select value={formData.frequency} onValueChange={(value: 'daily' | 'weekly') => setFormData({ ...formData, frequency: value })}>
              <SelectTrigger id="frequency">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-pink-600">
            Create Habit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
