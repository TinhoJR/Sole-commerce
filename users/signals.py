from django.dispatch import receiver
from django.db.models.signals import post_save
from django.contrib.auth import get_user_model
from . models import Profile


User = get_user_model()


@receiver(post_save,sender=User)
def handle_register_user(sender,instance,created,**kwargs):

    if created:
        Profile.objects.create(user=instance)
        print(f"PROFILE CREATED: {instance.username}")
