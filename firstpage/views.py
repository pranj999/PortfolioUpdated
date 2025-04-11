from django.shortcuts import render
from django.views.generic import TemplateView
from django.http import HttpResponse, JsonResponse
from django.template import loader
from django.views.decorators.http import require_http_methods
from django.core.mail import send_mail
from django.conf import settings
import json
import logging

# Set up logging
logger = logging.getLogger(__name__)


# Create your views here.
def home(request):
    """
    Render the home page of the portfolio site.
    """
    context = {
        'is_home': True,
        'page_title': 'Home',
        'meta_description': 'Pranjal Patel - Data Analyst with expertise in SQL, Python, and data visualization tools like Tableau and Looker Studio.'
    }
    return render(request, 'home.html', context)


def handler404(request, exception=None):
    """
    Custom 404 error handler
    """
    context = {
        'meta_description': 'Sorry, the page you are looking for does not exist. Return to the Pranjal Patel\'s portfolio homepage.'
    }
    return render(request, '404.html', context, status=404)


def handler500(request):
    """
    Custom 500 error handler
    """
    context = {
        'meta_description': 'We\'re experiencing some technical difficulties. Please try again later.'
    }
    template = loader.get_template('500.html')
    return HttpResponse(template.render(context, request), status=500)


@require_http_methods(["POST"])
def contact_form(request):
    """
    Handle contact form submissions.
    This sends an email to the site owner and returns a JSON response.
    """
    if request.method == 'POST':
        name = request.POST.get('name', '')
        email = request.POST.get('email', '')
        message = request.POST.get('message', '')

        # Simple validation
        if not all([name, email, message]):
            return JsonResponse({'success': False, 'error': 'All fields are required'}, status=400)

        if len(message) < 10:
            return JsonResponse({'success': False, 'error': 'Message is too short'}, status=400)

        try:
            # Prepare email
            subject = f"Portfolio Contact: {name}"
            email_message = f"""
            You have received a new message from your portfolio website:

            Name: {name}
            Email: {email}

            Message:
            {message}
            """
            from_email = settings.DEFAULT_FROM_EMAIL
            recipient_list = [settings.CONTACT_EMAIL]  # This should be defined in settings.py

            # Send email
            send_mail(
                subject,
                email_message,
                from_email,
                recipient_list,
                fail_silently=False,
            )

            # Log successful submission
            logger.info(f"Contact form submitted by {email}")

            return JsonResponse({'success': True})

        except Exception as e:
            # Log the error
            logger.error(f"Contact form error: {str(e)}")
            return JsonResponse({'success': False, 'error': 'There was an error sending your message'}, status=500)