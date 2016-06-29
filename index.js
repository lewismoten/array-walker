(() => {

  'use strict';

  module.exports = arrayWalker;

  function arrayWalker(items, observationCallback, ...lineage) {

      items.forEach((value, key) => {

        if (Array.isArray(value)) {

          arrayWalker(value, observationCallback, ...lineage, key);

        } else {

          observationCallback(value, ...lineage, key);

        }

      });

    }

})();
