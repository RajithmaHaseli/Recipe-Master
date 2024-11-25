package Crud.Crud.Controller;

import Crud.Crud.Entity.Review;
import Crud.Crud.Service.ReviewService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ReviewControllerTest {

    @Mock
    private ReviewService reviewService;

    @InjectMocks
    private ReviewController reviewController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void createReview_ShouldReturnCreatedReview() {
        Review review = new Review();
        when(reviewService.createReview(review)).thenReturn(review);

        Review result = reviewController.createReview(review);

        assertNotNull(result);
        assertEquals("Great recipe!", result.getComment());
        verify(reviewService, times(1)).createReview(review);
    }

    @Test
    void getAllReview_ShouldReturnListOfReviews() {
        List<Review> reviews = Arrays.asList(
                new Review(),
                new Review()
        );
        when(reviewService.getAllReview()).thenReturn(reviews);

        List<Review> result = reviewController.getAllReview();

        assertNotNull(result);
        assertEquals(2, result.size());
        verify(reviewService, times(1)).getAllReview();
    }

    @Test
    void getReviewById_ShouldReturnReview() {
        Review review = new Review();
        when(reviewService.getReviewById(1L)).thenReturn(Optional.of(review));

        Optional<Review> result = reviewController.getReviewById(1L);

        assertTrue(result.isPresent());
        assertEquals("Delicious!", result.get().getComment());
        verify(reviewService, times(1)).getReviewById(1L);
    }

    @Test
    void getReviewById_ShouldReturnEmptyWhenNotFound() {
        when(reviewService.getReviewById(1L)).thenReturn(Optional.empty());

        Optional<Review> result = reviewController.getReviewById(1L);

        assertTrue(result.isEmpty());
        verify(reviewService, times(1)).getReviewById(1L);
    }

    @Test
    void updateReview_ShouldReturnUpdatedReview() {
        Review existingReview = new Review();
        Review updatedReview = new Review();
        when(reviewService.updateReview(1L, updatedReview)).thenReturn(updatedReview);

        Review result = reviewController.updateReview(1L, updatedReview);

        assertNotNull(result);
        assertEquals("Excellent!", result.getComment());
        verify(reviewService, times(1)).updateReview(1L, updatedReview);
    }

    @Test
    void deleteReview_ShouldReturnSuccessMessage() {
        doNothing().when(reviewService).deleteReview(1L);

        ResponseEntity<String> response = reviewController.deleteReview(1L);

        assertEquals("Review was Deleted Successfully", response.getBody());
        verify(reviewService, times(1)).deleteReview(1L);
    }
}
