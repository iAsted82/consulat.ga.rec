'use client';

import { Button } from '@/components/ui/button';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  href: string;
}

interface QuickActionsProps {
  actions: QuickAction[];
}

export function QuickActions({ actions }: QuickActionsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {actions.map((action) => {
        const Icon = action.icon;
        return (
          <Button
            key={action.id}
            variant="outline"
            className={`quick-action ${action.color} h-auto`}
            asChild
          >
            <div>
              <Icon className="w-6 h-6" />
              <span className="font-medium">{action.title}</span>
              <span className="text-sm opacity-80">{action.description}</span>
            </div>
          </Button>
        );
      })}
    </div>
  );
}