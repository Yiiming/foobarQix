from graphene import Mutation, ObjectType, List, Field, Int, String, ID, Boolean
from graphene_django.types import DjangoObjectType
from .models import CustomStepOne as StepModel
import re


class foobarQixStepOne():
    def __init__(self):
        self

    strThree = "Foo"
    strFive = "Bar"
    strSeven = "Qix"
    asterik = "*"

    def divisibleThree(numb):
        if numb%3 == 0:
            return "Foo"
        else:
            return ""

    def divisibleFive(numb):
        if numb%5 == 0:
            return "Bar"
        else:
            return ""

    def divisibleSeven(numb):
        if numb%7 == 0:
            return "Qix"
        else:
            return ""
  
    def cutByNumber(self, numb):
        strNumb = [int(a) for a in str(numb)]
        res = ""
        for val in strNumb:
            if val == 3:
                res += self.strThree
            elif val == 5:
                res += self.strFive
            elif val == 7:
                res += self.strSeven
        return res

    def cutByNumberAsterik(self, numb):
        strNumb = [int(a) for a in str(numb)]
        res = ""
        for val in strNumb:
            if val == 3:
                res += self.strThree
            elif val == 5:
                res += self.strFive
            elif val == 7:
                res += self.strSeven
            elif val == 0:
                res += self.asterik
        return res
    
    def updateStrNumber(self, numb):
        resultFinal = ''
        numberChosen = numb
        if (numb and numb != None):
            resultFinal += self.divisibleThree(numberChosen)
            resultFinal += self.divisibleFive(numberChosen)
            resultFinal += self.divisibleSeven(numberChosen)
            resultFinal += self.cutByNumber(self, numberChosen)
        if resultFinal == "":
            resultFinal = str(numberChosen)
        return resultFinal

    def updateStrNumberStepTwo(self, numb):
        resultFinal = ''
        numberChosen = numb
        if (numb and numb != None):
            resultFinal += self.divisibleThree(numberChosen)
            resultFinal += self.divisibleFive(numberChosen)
            resultFinal += self.divisibleSeven(numberChosen)
            resultFinal += self.cutByNumberAsterik(self, numberChosen)
        if resultFinal == "" or resultFinal == '*':
            resultFinal = str(numberChosen)
            resultFinal = resultFinal.replace('0', self.asterik);
        return resultFinal

class StepType(DjangoObjectType):
    class Meta:
        model = StepModel
        fields = "__all__"

class Query(ObjectType):
    steps = List(StepType)
    step = Field(StepType, step=String())
    @staticmethod
    def resolve_steps(self, info, **kwargs):
        return StepModel.objects.all()
    @staticmethod
    def resolve_step(self, info, **kwargs):
        return StepModel.objects.get_by_step(**kwargs)

class CreateStep(Mutation):
    id = ID()
    number_step = Int()
    string_step = String()
    step = String()

    class Arguments:
        number_step = Int(required=True)
        step = String(required=True)
    @staticmethod
    def mutate(_, info, number_step, step):
        string_step = foobarQixStepOne.updateStrNumber(foobarQixStepOne, number_step)
        stepData = StepModel.objects.create(number_step=number_step,
                                        string_step=string_step,
                                        step=step
                                        )
        return CreateStep(
            id=stepData.id,
            number_step=stepData.number_step,
            string_step=stepData.string_step,
            step=stepData.step)

class CreateStepTwo(Mutation):
    id = ID()
    number_step = Int()
    string_step = String()
    step = String()

    class Arguments:
        number_step = Int(required=True)
        step = String(required=True)
    @staticmethod
    def mutate(_, info, number_step, step):
        string_step = foobarQixStepOne.updateStrNumberStepTwo(foobarQixStepOne, number_step)
        stepData = StepModel.objects.create(number_step=number_step,
                                        string_step=string_step,
                                        step=step
                                        )
        return CreateStepTwo(
            id=stepData.id,
            number_step=stepData.number_step,
            string_step=stepData.string_step,
            step=stepData.step)

class deleteAllStepOne(Mutation):
    stepData = String()
    class Arguments:
        stepData = String(required=True)

    @staticmethod
    def mutate(_, info, stepData):
        StepModel.objects.filter(step=stepData).delete()
        return info

class Mutation(ObjectType):
    create_step = CreateStep.Field()
    create_step_two = CreateStepTwo.Field()
    delete_all_step = deleteAllStepOne.Field()
