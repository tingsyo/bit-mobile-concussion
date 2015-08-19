angular.module('starter.services', [])

/**
 * A simple example service that returns symptoms data.
 */
.factory('Symptoms', function() {
  // Might use a resource here that returns a JSON array

  // 15 major symptoms for post-concussion patients
  var symptoms = [
    { id: 0, name: '頭痛' },
    { id: 1, name: '頭暈' },
    { id: 2, name: '焦慮' },
    { id: 3, name: '注意力不集中' },
    { id: 4, name: '容易疲倦' },
    { id: 5, name: '噁心' },
    { id: 6, name: '體力變差' },
    { id: 7, name: '憂鬱' },
    { id: 8, name: '記憶力下降' },
    { id: 9, name: '嘔吐' },
    { id: 10, name: '視力模糊' },
    { id: 11, name: '易怒' },
    { id: 12, name: '失眠' },
    { id: 13, name: '反應遲鈍' },
    { id: 14, name: '耳鳴' }
  ];

  return {
    all: function() {
      return symptoms;
    },
    get: function(symId) {
      // Simple index lookup
      return symptoms[symId];
    }
  }
});
