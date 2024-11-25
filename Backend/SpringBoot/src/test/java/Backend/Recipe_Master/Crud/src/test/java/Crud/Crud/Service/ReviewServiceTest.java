package Crud.Crud.Service;

import Crud.Crud.Entity.Review;
import Crud.Crud.Repository.ReviewRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ReviewServiceTest {

    @Mock
    private ReviewRepository reviewRepository;

    @InjectMocks
    private ReviewService reviewService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getAllReview_ShouldReturnAllReviews() {
        List<Review> reviews = Arrays.asList(
                new Review(),
                new Review()
        );
        when(reviewRepository.findAll()).thenReturn(reviews);

        List<Review> result = reviewService.getAllReview();

        assertNotNull(result);
        assertEquals(2, result.size());
        verify(reviewRepository, times(1)).findAll();
    }

    @Test
    void getReviewById_ShouldReturnReviewWhenFound() {
        Review review = new Review();
        when(reviewRepository.findById(1L)).thenReturn(Optional.of(review));

        Optional<Review> result = reviewService.getReviewById(1L);

        assertTrue(result.isPresent());
        assertEquals("Alice", result.get().getName());
        verify(reviewRepository, times(1)).findById(1L);
    }

    @Test
    void getReviewById_ShouldReturnEmptyWhenNotFound() {
        when(reviewRepository.findById(1L)).thenReturn(Optional.empty());

        Optional<Review> result = reviewService.getReviewById(1L);

        assertTrue(result.isEmpty());
        verify(reviewRepository, times(1)).findById(1L);
    }

    @Test
    void createReview_ShouldReturnSavedReview() {
        Review review = new Review();
        when(reviewRepository.save(review)).thenReturn(review);

        Review result = reviewService.createReview(review);

        assertNotNull(result);
        assertEquals("Alice", result.getName());
        assertEquals(5, result.getRating());
        verify(reviewRepository, times(1)).save(review);
    }

    @Test
    void updateReview_ShouldReturnUpdatedReview() {
        Review existingReview = new Review();
        Review updatedDetails = new Review();

        when(reviewRepository.findById(1L)).thenReturn(Optional.of(existingReview));
        when(reviewRepository.save(existingReview)).thenReturn(existingReview);

        Review result = reviewService.updateReview(1L, updatedDetails);

        assertNotNull(result);
        assertEquals("Excellent", result.getComment());
        assertEquals(5, result.getRating());
        verify(reviewRepository, times(1)).findById(1L);
        verify(reviewRepository, times(1)).save(existingReview);
    }

    @Test
    void updateReview_ShouldThrowExceptionWhenNotFound() {
        when(reviewRepository.findById(1L)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            reviewService.updateReview(1L, new Review());
        });

        assertEquals("Review not found", exception.getMessage());
        verify(reviewRepository, times(1)).findById(1L);
        verify(reviewRepository, never()).save(any(Review.class));
    }

    @Test
    void deleteReview_ShouldDeleteReviewWhenFound() {
        doNothing().when(reviewRepository).deleteById(1L);

        reviewService.deleteReview(1L);

        verify(reviewRepository, times(1)).deleteById(1L);
    }
}
