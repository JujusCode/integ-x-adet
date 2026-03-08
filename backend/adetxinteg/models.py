from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    specs = models.CharField(max_length=255)

    status = models.CharField(max_length=50, default="In Stock")
    
    # DecimalField is crucial for currency so we don't get floating-point math errors
    price = models.DecimalField(max_digits=10, decimal_places=2) 
    
    # We store the raw number, frontend handles the "Low Stock" badge logic
    stock = models.IntegerField(default=0)
    
    # Always good practice to know when a device was added to the database
    created_at = models.DateTimeField(auto_now_add=True)

    # ADDED: The Image Field
    image = models.ImageField(upload_to='products/', null=True, blank=True)

    def __str__(self):
        return f"{self.name} - ${self.price}"