from django.shortcuts import render
from django.views.generic import TemplateView
from django.http import HttpResponse, JsonResponse
from django.template import loader
from django.views.decorators.http import require_http_methods


# Create your views here.
def home(request):
    """
    Render the home page of the portfolio site.
    """
    context = {
        'is_home': True,
        'page_title': 'Home',
        'meta_description': 'Pranjal Patel - Computer Science professional specializing in data science and machine learning. View my portfolio, projects, and experience.'
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
    This is a simple implementation. For production, consider using:
    - Form validation with Django forms
    - CSRF protection (already included in Django)
    - Email sending with proper error handling
    - Rate limiting to prevent spam
    """
    if request.method == 'POST':
        name = request.POST.get('name', '')
        email = request.POST.get('email', '')
        message = request.POST.get('message', '')

        # Simple validation
        if not all([name, email, message]):
            return JsonResponse({'success': False, 'error': 'All fields are required'}, status=400)

        try:
            # Here you would typically send an email
            # For demo purposes, we'll just return success
            # send_mail(...)

            return JsonResponse({'success': True})
        except Exception as e:
            return JsonResponse({'success': False, 'error': str(e)}, status=500)