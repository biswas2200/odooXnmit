package com.odoo.odoo.controller;


import com.odoo.odoo.dto.response.UserResponse;
import com.odoo.odoo.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@Tag(name = "User", description = "User management APIs")
@CrossOrigin(origins = "*")
public class UserController {

    private final UserService userService;

    @GetMapping("/profile")
    @Operation(summary = "Get current user profile")
    public ResponseEntity<UserResponse> getUserProfile() {
        UserResponse response = userService.getUserProfile();
        return ResponseEntity.ok(response);
    }
}
