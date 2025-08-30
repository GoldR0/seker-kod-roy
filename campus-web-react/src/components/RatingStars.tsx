import React, { useState } from 'react';
import { Box, Typography, IconButton, Tooltip } from '@mui/material';
import { Star as StarIcon, StarBorder as StarBorderIcon } from '@mui/icons-material';

interface RatingStarsProps {
  value: number;
  onChange: (rating: number) => void;
  size?: 'small' | 'medium' | 'large';
  showLabel?: boolean;
  disabled?: boolean;
  totalRatings?: number;
  averageRating?: number;
}

const RatingStars: React.FC<RatingStarsProps> = ({
  value,
  onChange,
  size = 'medium',
  showLabel = true,
  disabled = false,
  totalRatings = 0,
  averageRating = 0
}) => {
  const [hoverValue, setHoverValue] = useState(0);

  const getSize = () => {
    switch (size) {
      case 'small': return 16;
      case 'large': return 32;
      default: return 24;
    }
  };

  const getColor = (starValue: number) => {
    const currentValue = hoverValue || value;
    if (starValue <= currentValue) {
      return '#FFD700'; // זהב
    }
    return '#E0E0E0'; // אפור
  };

  const handleStarClick = (rating: number) => {
    if (!disabled) {
      onChange(rating);
    }
  };

  const handleStarHover = (rating: number) => {
    if (!disabled) {
      setHoverValue(rating);
    }
  };

  const handleMouseLeave = () => {
    if (!disabled) {
      setHoverValue(0);
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center',
          gap: 0.5
        }}
        onMouseLeave={handleMouseLeave}
      >
        {[1, 2, 3, 4, 5].map((star) => (
          <Tooltip 
            key={star} 
            title={`${star} כוכבים`}
            arrow
          >
            <IconButton
              onClick={() => handleStarClick(star)}
              onMouseEnter={() => handleStarHover(star)}
              disabled={disabled}
              sx={{
                p: 0.5,
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.1)',
                  '& .MuiSvgIcon-root': {
                    filter: 'drop-shadow(0 0 4px rgba(255, 215, 0, 0.5))'
                  }
                },
                '&:active': {
                  transform: 'scale(0.95)'
                }
              }}
            >
              {star <= (hoverValue || value) ? (
                <StarIcon 
                  sx={{ 
                    fontSize: getSize(),
                    color: getColor(star),
                    transition: 'all 0.2s ease-in-out'
                  }} 
                />
              ) : (
                <StarBorderIcon 
                  sx={{ 
                    fontSize: getSize(),
                    color: getColor(star),
                    transition: 'all 0.2s ease-in-out'
                  }} 
                />
              )}
            </IconButton>
          </Tooltip>
        ))}
      </Box>
      
      {showLabel && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ fontWeight: 'bold' }}
          >
            {value > 0 ? `${value}/5` : 'לא דורג'}
          </Typography>
          
          {totalRatings > 0 && (
            <Typography 
              variant="caption" 
              color="text.secondary"
              sx={{ 
                backgroundColor: 'rgba(0,0,0,0.05)', 
                px: 1, 
                py: 0.5, 
                borderRadius: 1,
                fontSize: '0.75rem'
              }}
            >
              {totalRatings} דירוגים
            </Typography>
          )}
          
          {averageRating > 0 && (
            <Typography 
              variant="caption" 
              color="primary"
              sx={{ fontWeight: 'bold' }}
            >
              ממוצע: {averageRating.toFixed(1)}
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
};

export default RatingStars;
