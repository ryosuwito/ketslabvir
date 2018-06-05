# -*- coding: utf-8 -*-
from __future__ import unicode_literals

#from django.shortcuts import render

# Create your views here.
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from django.views.generic import View
from django.utils import timezone
from django.shortcuts import render
from django.http import HttpResponse
from .render import Render

@login_required(login_url='/admin/login/')
def ukur(request, method):
    request = request
    template = '%s.html'%method
    return render(request, template)

@login_required(login_url='/admin/login/')
def pretest(request):
    request = request
    template = 'pre.html'
    return render(request, template)

class Pdf(View):
    def get(self, request):
        data = {
                'seri':{'res1':120, 'res2':229, 'res3':234, 'totalres':2134},
                'parallel':{'res1':120, 'res2':229, 'res3':234, 'totalres':2134}
        }
        today = timezone.now()
        params = {
            'today': today,
            'data': data,
            'request': request
        }
        return Render.render('pdf.html', params)

#@csrf_exempt
class Submit(View):
    data ={}
    def get_params(self, request, data):
        today = timezone.now()
        params = {
            'today': today,
            'data': data,
            'request': request
        }
        return params

    def post(self, request, method):
        if method == 'pretest':
            params = self.get_params(request, self.get_jawaban(request))
            return Render.render('pdf_pretest.html', params)
        if method == 'arus':
            self.data = self.get_hambatan(request, True)
            self.get_arus(request, True)
            self.get_tegangan_sumber(request, True)
            params = self.get_params(request, self.data)
            return Render.render('pdf_arus.html', params)
        elif method == 'tegangan':
            self.data = self.get_hambatan(request, False)
            self.get_arus(request, False)
            self.get_tegangan_sumber(request, False)
            self.get_tegangan_resistor(request)
            params = self.get_params(request, self.data)
            return Render.render('pdf_tegangan.html', params)
        elif method == 'hambatan':
            params = self.get_params(request, self.get_hambatan(request, True))
            return Render.render('pdf_hambatan.html', params)
        else:
            return HttpResponse("Method not Found", status=400)

    def get_tegangan_resistor(self, request):
        self.data['seri1']['volt1'] = request.POST['seri1volt1']
        self.data['seri1']['volt2'] = request.POST['seri1volt2']
        self.data['seri1']['volt3'] = request.POST['seri1volt3']
        self.data['seri2']['volt1'] = request.POST['seri2volt1']
        self.data['seri2']['volt2'] = request.POST['seri2volt2']
        self.data['seri2']['volt3'] = request.POST['seri2volt3']
        self.data['seri3']['volt1'] = request.POST['seri3volt1']
        self.data['seri3']['volt2'] = request.POST['seri3volt2']
        self.data['seri3']['volt3'] = request.POST['seri3volt3']


    def get_tegangan_sumber(self, request, include_parallel):
        self.data['seri1']['volt'] = request.POST['seri1volt']
        self.data['seri2']['volt'] = request.POST['seri2volt']
        self.data['seri3']['volt'] = request.POST['seri3volt']
        if not include_parallel : 
            return
        self.data['parallel1']['volt'] = request.POST['para1volt']
        self.data['parallel2']['volt'] = request.POST['para2volt']
        self.data['parallel3']['volt'] = request.POST['para3volt']


    def get_arus(self, request, include_parallel):
        self.data['seri1']['amp'] = request.POST['seri1amp']
        self.data['seri2']['amp'] = request.POST['seri2amp']
        self.data['seri3']['amp'] = request.POST['seri3amp']
        if not include_parallel :
            return
        self.data['parallel1']['amp'] = request.POST['para1amp']
        self.data['parallel2']['amp'] = request.POST['para2amp']
        self.data['parallel3']['amp'] = request.POST['para3amp']

    def get_jawaban(self, request):
        data = {}
        data['jawaban1'] = request.POST['jawaban1']
        data['jawaban2'] = request.POST['jawaban2']
        data['jawaban3'] = request.POST['jawaban3']
        data['jawaban4'] = request.POST['jawaban4']
        return data

    def get_hambatan(self, request, include_parallel):
        if request.method == "POST":
            params1 = {}
            params2 = {}
            params3 = {}

            params4 = {}
            params5 = {}
            params6 = {}

	    data = {}

            params1['res1'] = request.POST['seri1res1']
            params1['res2'] = request.POST['seri1res2']
            params1['res3'] = request.POST['seri1res3']
            if include_parallel : params1['total'] = request.POST['seri1total']
            data['seri1'] = params1

            params2['res1'] = request.POST['seri2res1']
            params2['res2'] = request.POST['seri2res2']
            params2['res3'] = request.POST['seri2res3']
            if include_parallel : params2['total'] = request.POST['seri2total']
            data['seri2'] = params2

            params3['res1'] = request.POST['seri3res1']
            params3['res2'] = request.POST['seri3res2']
            params3['res3'] = request.POST['seri3res3']
            if include_parallel : params3['total'] = request.POST['seri3total']
            data['seri3'] = params3

            if not include_parallel :
                return data

            params4['res1'] = request.POST['para1res1']
            params4['res2'] = request.POST['para1res2']
            params4['res3'] = request.POST['para1res3']
            params4['total'] = request.POST['para1total']
            data['parallel1'] = params4

            params5['res1'] = request.POST['para2res1']
            params5['res2'] = request.POST['para2res2']
            params5['res3'] = request.POST['para2res3']
            params5['total'] = request.POST['para2total']
            data['parallel2'] = params5

            params6['res1'] = request.POST['para3res1']
            params6['res2'] = request.POST['para3res2']
            params6['res3'] = request.POST['para3res3']
            params6['total'] = request.POST['para3total']
            data['parallel3'] = params5

            return data
        else:
            return HttpResponse("Method not Found", status=400)
