import { Badge, BadgeText } from '@/components/ui/badge';
import React from 'react';


export const SosBadge = () => {
    return (
        <Badge variant="destructive" className='rounded-full'>
            <BadgeText>SOS</BadgeText>
        </Badge>
    );
}