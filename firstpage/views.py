from django.shortcuts import render
from django.views.generic import TemplateView
from django.http import HttpResponse
from django.template import loader
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