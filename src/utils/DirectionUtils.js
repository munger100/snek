import React from 'react';

export const directionToCharacter = (d) => {
    switch (d) {
        case 'd':
            return '↓';
        case 'r':
            return '→';
        case 'u':
            return '↑';
        case 'l':
            return '←';
    }
};

