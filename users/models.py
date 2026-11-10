from django.db import models
from django.templatetags.static import static

# Create your models here.

from django.contrib.auth.models import AbstractUser



class User(AbstractUser):



    def __str__(self):
        return self.username


class Profile(models.Model):

    user = models.OneToOneField(User,on_delete=models.CASCADE,related_name="profile")
    profile_picture = models.FileField(null=True,blank=True,upload_to="profiles/")
    phone_number = models.IntegerField()
    state = models.CharField(max_length=350)
    country = models.CharField(max_length=350)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    @property
    def display_photo(self):

        try:
            return self.profile_picture.url or static("IMAGES/default_dp.jpj")
        except:
            return static("IMAGES/default_dp.jpj")


    def __str__(self):

        return self.user.username
