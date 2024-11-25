package Crud.Crud.Service;


import Crud.Crud.Entity.Food;
import Crud.Crud.Repository.FoodRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FoodService {

    private final FoodRepository foodRepository;

    public Food postfood(Food food, MultipartFile imageFile) throws IOException {
        food.setImage(imageFile.getBytes());
        return foodRepository.save(food);

    }

    public List<Food> getAllFood() {
        return foodRepository.findAll();
    }

    public Food getFoodById(Long id) {
        return foodRepository.findById(id).orElse(null);
    }

    public void deletefood(Long id) {
        foodRepository.deleteById(id);
    }

    public Food updateFood(Long id, Food food, MultipartFile imageFile) throws IOException {
        Food existingFood = foodRepository.findById(id).orElse(null);
        if (existingFood != null) {
            existingFood.setName(food.getName());

            existingFood.setPrice(food.getPrice());
            existingFood.setTime(food.getTime());



            // If a new image is provided, update it
            if (imageFile != null && !imageFile.isEmpty()) {
                existingFood.setImage(imageFile.getBytes());
            }
            return foodRepository.save(existingFood);
        }
        return null;
    }

}
