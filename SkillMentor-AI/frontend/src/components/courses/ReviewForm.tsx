
import React, { useState } from 'react';
import { useCourses } from '../../contexts/CourseContext';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Star } from 'lucide-react';

interface ReviewFormProps {
  courseId: string;
  onSubmitted: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ courseId, onSubmitted }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [hoveredRating, setHoveredRating] = useState(0);
  const { addReview } = useCourses();
  const { user } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user && rating > 0) {
      addReview({
        courseId,
        studentId: user.id,
        studentName: user.name,
        rating,
        comment,
        date: new Date().toISOString().split('T')[0]
      });
      setRating(0);
      setComment('');
      onSubmitted();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Rating
        </label>
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              className="p-1"
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              onClick={() => setRating(star)}
            >
              <Star
                className={`h-6 w-6 ${
                  star <= (hoveredRating || rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Review
        </label>
        <Textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your thoughts about this course..."
          rows={4}
        />
      </div>

      <div className="flex space-x-3">
        <Button type="submit" disabled={rating === 0}>
          Submit Review
        </Button>
        <Button type="button" variant="outline" onClick={onSubmitted}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default ReviewForm;
