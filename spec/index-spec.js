/* global describe it expect jasmine */
(() => {

  'use strict';

  const target = require('../index');

  describe('module', () => {

    describe('empty array', () => {

      let items = [],
        callback = jasmine.createSpy('callback');

      target(items, callback);

      it('does not trigger callback', () => {

        expect(callback).not.toHaveBeenCalled();

      });

    });

    describe('string', () => {

      let items = 'letters',
        callback = jasmine.createSpy('callback');

      it('throws an error', () => {

        expect(() => target(items, callback)).toThrow();
        expect(callback).not.toHaveBeenCalled();

      });

    });

    describe('array-like object', () => {

      let items = {length: 32},
        callback = jasmine.createSpy('callback');

      it('throws an error', () => {

        expect(() => target(items, callback)).toThrow();
        expect(callback).not.toHaveBeenCalled();

      });

    });

    describe('1d', () => {

      let items = ['a', 'b', 'c'],
        callback = jasmine.createSpy('callback');

      target(items, callback);

      it('executes callback for each item', () => {

        expect(callback).toHaveBeenCalledWith('a', 0);
        expect(callback).toHaveBeenCalledWith('b', 1);
        expect(callback).toHaveBeenCalledWith('c', 2);
        expect(callback.calls.length).toBe(3);

      });

    });

    describe('2d', () => {

      let items = [
          ['d', 'e', 'f'],
          ['g', 'h', 'i']
        ],
        callback = jasmine.createSpy('callback');

      target(items, callback);

      it('executes callback for each item', () => {

        expect(callback).toHaveBeenCalledWith('d', 0, 0);
        expect(callback).toHaveBeenCalledWith('e', 0, 1);
        expect(callback).toHaveBeenCalledWith('f', 0, 2);
        expect(callback).toHaveBeenCalledWith('g', 1, 0);
        expect(callback).toHaveBeenCalledWith('h', 1, 1);
        expect(callback).toHaveBeenCalledWith('i', 1, 2);
        expect(callback.calls.length).toBe(6);

      });

    });

    describe('3d', () => {

      let items =
        [
          [
            ['j'],
            ['k'],
            ['l']
          ],
          [
            ['m'],
            ['n'],
            ['o']
          ]
        ],
        callback = jasmine.createSpy('callback');

      target(items, callback);

      it('executes callback for each item', () => {

        expect(callback).toHaveBeenCalledWith('j', 0, 0, 0);
        expect(callback).toHaveBeenCalledWith('k', 0, 1, 0);
        expect(callback).toHaveBeenCalledWith('l', 0, 2, 0);
        expect(callback).toHaveBeenCalledWith('m', 1, 0, 0);
        expect(callback).toHaveBeenCalledWith('n', 1, 1, 0);
        expect(callback).toHaveBeenCalledWith('o', 1, 2, 0);
        expect(callback.calls.length).toBe(6);

      });

    });

    describe('jagged array', () => {

      let items = ['p', ['q', 'r'], [], 's'],
        callback = jasmine.createSpy('callback');

      target(items, callback);

      it('executes callback for each item', () => {

        expect(callback).toHaveBeenCalledWith('p', 0);
        expect(callback).toHaveBeenCalledWith('q', 1, 0);
        expect(callback).toHaveBeenCalledWith('r', 1, 1);
        expect(callback).toHaveBeenCalledWith('s', 3);
        expect(callback.calls.length).toBe(4);

      });

    });

    describe('forced lineage', () => {

      let items = ['t'],
        callback = jasmine.createSpy('callback'),
        context;

      target(items, callback, context, 1, 2, 'three');

      it('executes callback for each item', () => {

        expect(callback).toHaveBeenCalledWith('t', 1, 2, 'three', 0);
        expect(callback.calls.length).toBe(1);

      });

    });

    describe('callbacks with context', () => {

      let items = ['t'],
        callback = jasmine.createSpy('callback'),
        context = {
          testing: 'the context'
        };

      target(items, callback, context);

      it('provides context', () => {

        expect(callback.calls[0].object).toBe(context);

      });

    });

  });

})();
