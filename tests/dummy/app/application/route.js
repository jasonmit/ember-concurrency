import Route from '@ember/routing/route';
import { inject } from '@ember/service';
import Ember from 'ember';

export default Route.extend({
  fastboot: inject(),

  actions: {
    didTransition() {
      if (!Ember.testing && !this.get('fastboot.isFastBoot')) {
        window.scrollTo(0,0);
      }

      return true;
    }
  }
});
