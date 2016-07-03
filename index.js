(() => {

  'use strict';

  module.exports = arrayWalker;

  function arrayWalker(items, observationCallback, context, ...lineage) {

      items.forEach((value, key) => {

        if (Array.isArray(value)) {

          arrayWalker(value, observationCallback, context, ...lineage, key);

        } else {

          observationCallback.call(context, value, ...lineage, key);

        }

      });

    }

})();
