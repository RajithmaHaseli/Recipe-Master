package Crud.Crud.Controller;

import Crud.Crud.Entity.Food;
import Crud.Crud.Service.FoodService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
@CrossOrigin("*")  // Allow CORS for all origins (or specify your frontend origin)
public class FoodController {

    private final FoodService foodService;

    @PostMapping(value = "/food", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> postFood(@RequestParam("image") MultipartFile imageFile,
                                      @RequestParam("name") String name,
                                      @RequestParam("price") Integer price,
                                      @RequestParam("time") String time) {
        try {
            Food food = new Food();
            food.setName(name);
            food.setPrice(price);
            food.setTime(time);

            // Set image as byte[] from MultipartFile
            food.setImage(imageFile.getBytes());

            // Assuming you have a service to handle the food data
            Food createdFood = foodService.postfood(food, imageFile);
            return ResponseEntity.ok(createdFood);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error uploading image");
        }
    }

    @GetMapping("/getfood")
    public List<Food> getAllFood() {
        return foodService.getAllFood();
    }

    @GetMapping("/food/{id}")
    public ResponseEntity<?> getFoodById(@PathVariable Long id) {
        Food food = foodService.getFoodById(id);
        if (food == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(food);
    }

    @GetMapping("/food/{id}/image")
    public ResponseEntity<byte[]> getFoodImage(@PathVariable Long id) {
        Food food = foodService.getFoodById(id);
        if (food == null || food.getImage() == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + id + ".jpg\"")
                .contentType(MediaType.IMAGE_JPEG)
                .body(food.getImage());
    }

    @DeleteMapping("/food/{id}")
    public ResponseEntity<?> deleteFood(@PathVariable Long id) {
        try {
            foodService.deletefood(id);
            return new ResponseEntity<>("Food with ID " + id + " deleted successfully", HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @PatchMapping(value = "/food/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> updateFood(@PathVariable Long id,
                                        @RequestParam(value = "image", required = false) MultipartFile imageFile,
                                        @RequestParam("name") String name,
                                        @RequestParam("price") Integer price,
                                        @RequestParam("time") String time) {
        try {
            Food food = new Food();
            food.setName(name);
            food.setPrice(price);
            food.setTime(time);

            // If there's a new image, update it
            if (imageFile != null) {
                food.setImage(imageFile.getBytes());
            }

            Food updatedFood = foodService.updateFood(id, food, imageFile);
            if (updatedFood == null) return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
            return ResponseEntity.ok(updatedFood);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error uploading image");
        }
    }
}
