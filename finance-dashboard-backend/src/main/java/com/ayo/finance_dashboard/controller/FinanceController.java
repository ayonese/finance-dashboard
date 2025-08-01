package com.ayo.finance_dashboard.controller;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api")
public class FinanceController {

    @GetMapping("/accounts")
    public List<Map<String, Object>> getAccounts() {
        return List.of(
            Map.of("id", "acc1", "name", "Checking", "balance", 2540.75),
            Map.of("id", "acc2", "name", "Savings", "balance", 10230.50)
        );
    }

    @GetMapping("/transactions")
    public List<Map<String, Object>> getTransactions() {
        return List.of(
            Map.of("id", "t1", "accountId", "acc1", "description", "Coffee", "amount", 4.50, "category", "Food", "date", "2025-07-30"),
            Map.of("id", "t2", "accountId", "acc1", "description", "Groceries", "amount", 65.20, "category", "Food", "date", "2025-07-29"),
            Map.of("id", "t3", "accountId", "acc2", "description", "Salary", "amount", 3000.00, "category", "Income", "date", "2025-07-25"),
            Map.of("id", "t4", "accountId", "acc1", "description", "Spotify", "amount", 9.99, "category", "Entertainment", "date", "2025-07-20"),
            Map.of("id", "t5", "accountId", "acc1", "description", "Electricity Bill", "amount", 120.00, "category", "Utilities", "date", "2025-07-18")
        );
    }
}
