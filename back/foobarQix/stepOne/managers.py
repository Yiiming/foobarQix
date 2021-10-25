from django.utils.translation import ugettext_lazy as _
from django.contrib import messages

class StepOneManager():
    """
    Custom step one model manager.
    """

    def create(self, number_step, string_step, **fields):
        """
        Create and save a Step.
        """
        foobarData = self.model(strNumber=number_step, **fields)
        foobarData.save()
        return foobarData

    def delete(self, number_step):
        """
        Delete User.
        """
        if not number_step:
            raise ValueError(_('No step set'))
        obj = self.get(number_step=number_step)
        return obj.delete()

    def get_by_step(self, step=None):
        if not step:
            raise ValueError(_('An Step is required'))

        return self.get(step=step)