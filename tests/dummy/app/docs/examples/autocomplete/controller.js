import { isBlank } from '@ember/utils';
import Controller from '@ember/controller';
import { readOnly } from '@ember/object/computed';
import { task } from 'ember-concurrency';
import { computed } from '@ember/object';

// BEGIN-SNIPPET debounced-search-with-cancelation
export default Controller.extend({
  lastSuccessful: readOnly('searchRepo.lastSuccessful.value'),

  // // Uncomment this block and bug will not be present
  // lastSuccessful: computed('searchRepo.lastSuccessful.value', function() {
  //   return this.get('searchRepo.lastSuccessful.value');
  // }).readOnly(),

  hasResults: computed('lastSuccessful', 'searchRepo.isRunning', function() {
    // accessing a prop triggers the bug (happens with isIdle as well)
    this.get('searchRepo.isRunning');

    return this.get('lastSuccessful.length') > 0;
  }),

  searchRepo: task(function * (term) {
    if (isBlank(term)) { return []; }

    let url = `https://api.github.com/search/repositories?q=${term}`;
    let res = yield fetch(url);
    let json = yield res.json();

    return json.items.slice(0, 10);
  })
});
// END-SNIPPET

