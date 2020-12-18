from django.shortcuts import render
from django.db.models import CharField
from django.db.models import Q

from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status
 
from myapi.models import Banks, Branches
from myapi.serializers import BankSerializer, BranchSerializer
from rest_framework.decorators import api_view

from functools import reduce
from operator import or_


@api_view(['GET', 'POST', 'DELETE'])
def myapi_list(request):
    # GET list of tutorials, POST a new tutorial, DELETE all tutorials
    if request.method == 'GET':
        branches = Branches.objects.order_by('ifsc')
        
        branch = request.GET.get('q', None)
        offset = int(request.GET.get('offset', None))
        limit = int(request.GET.get('limit', None))
        
        if branch is not None:
            branches = branches.filter(branch__iregex=r'^' + branch)[offset:offset+limit]

        branches_serializer = BranchSerializer(branches, many=True)
        return JsonResponse(branches_serializer.data, safe=False)
 
 
@api_view(['GET', 'PUT', 'DELETE'])
def myapi_detail(request):
    if request.method == 'GET':
        branches = Branches.objects.order_by('ifsc')

        key = request.GET.get('q', None)
        offset = int(request.GET.get('offset', None))
        limit = int(request.GET.get('limit', None))

        branches = branches.filter(Q(branch__icontains=key) | Q(city__icontains=key) | Q(address__icontains=key) | Q(state__icontains=key) | Q(district__icontains=key) | Q(ifsc__icontains=key))[offset:offset+limit]
    
        branches_serializer = BranchSerializer(branches, many=True)
        return JsonResponse(branches_serializer.data, safe=False) 
