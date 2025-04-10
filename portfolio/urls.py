from django.urls import path
from django.contrib.sitemaps.views import sitemap
from django.views.generic.base import TemplateView
from . import views
from .sitemap import StaticViewSitemap

sitemaps = {
    'static': StaticViewSitemap,
}

urlpatterns = [
    path('', views.home, name='home'),
    path('sitemap.xml', sitemap, {'sitemaps': sitemaps}, name='sitemap'),
    path('robots.txt', TemplateView.as_view(template_name="robots.txt", content_type="text/plain")),
    path('contact/submit/', views.contact_form, name='contact_form'),
]

# Custom error handlers
handler404 = 'firstpage.views.handler404'
handler500 = 'firstpage.views.handler500'