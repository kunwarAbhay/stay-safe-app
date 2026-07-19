import { Badge, BadgeText } from '@/components/ui/badge';
import React from 'react';


export const StayWithMeBadge = () => {
    return (
        <Badge variant="success" className='rounded-full'>
            <BadgeText>Stay With Me</BadgeText>
        </Badge>
    );
}