from django.contrib.sitemaps import Sitemap
from django.urls import reverse

class StaticViewSitemap(Sitemap):
    priority = 0.5
    changefreq = 'monthly'

    def items(self):
        return ['home', 'projects', 'resume']  # Removed 'contact' from here

    def location(self, item):
        return reverse(item)