from django.shortcuts import render

from django.template import RequestContext
from django.http import HttpResponseRedirect

from django.views.decorators.csrf import csrf_protect


def home(request):
  context={}
  return render(request,'dashboard.html',context)



def login(request):
  context={}
  return render(request,'login.html',context)


def register(request):
  context={}
  return render(request,'register.html',context)