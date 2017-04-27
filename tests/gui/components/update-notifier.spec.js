'use strict';

const m = require('mochainon');
const _ = require('lodash');
const angular = require('angular');
const units = require('../../../lib/shared/units');
const release = require('../../../lib/shared/release');
require('angular-mocks');

describe('Browser: UpdateNotifier', function() {

  beforeEach(angular.mock.module(
    require('../../../lib/gui/components/update-notifier')
  ));

  describe('UpdateNotifierService', function() {

    describe('.UPDATE_NOTIFIER_SLEEP_DAYS', function() {

      let UpdateNotifierService;

      beforeEach(angular.mock.inject(function(_UpdateNotifierService_) {
        UpdateNotifierService = _UpdateNotifierService_;
      }));

      it('should be an integer', function() {
        m.chai.expect(_.isInteger(UpdateNotifierService.UPDATE_NOTIFIER_SLEEP_DAYS)).to.be.true;
      });

      it('should be greater than 0', function() {
        m.chai.expect(UpdateNotifierService.UPDATE_NOTIFIER_SLEEP_DAYS > 0).to.be.true;
      });

    });

    describe('.shouldCheckForUpdates()', function() {

      let UpdateNotifierService;

      beforeEach(angular.mock.inject(function(_UpdateNotifierService_) {
        UpdateNotifierService = _UpdateNotifierService_;
      }));

      describe('given `lastSleptUpdateNotifier` is undefined', function() {

        it('should return true if releaseType is production', function() {
          const result = UpdateNotifierService.shouldCheckForUpdates({
            lastSleptUpdateNotifier: undefined,
            releaseType: release.RELEASE_TYPE.PRODUCTION
          });

          m.chai.expect(result).to.be.true;
        });

        it('should return true if releaseType is snapshot', function() {
          const result = UpdateNotifierService.shouldCheckForUpdates({
            lastSleptUpdateNotifier: undefined,
            releaseType: release.RELEASE_TYPE.SNAPSHOT
          });

          m.chai.expect(result).to.be.true;
        });

        it('should return true if releaseType is unknown', function() {
          const result = UpdateNotifierService.shouldCheckForUpdates({
            lastSleptUpdateNotifier: undefined,
            releaseType: release.RELEASE_TYPE.UNKNOWN
          });

          m.chai.expect(result).to.be.true;
        });

      });

      describe('given the `lastSleptUpdateNotifier` was very recently updated', function() {

        it('should return false if releaseType is production', function() {
          const result = UpdateNotifierService.shouldCheckForUpdates({
            lastSleptUpdateNotifier: Date.now() - 1000,
            releaseType: release.RELEASE_TYPE.PRODUCTION
          });

          m.chai.expect(result).to.be.false;
        });

        it('should return true if releaseType is snapshot', function() {
          const result = UpdateNotifierService.shouldCheckForUpdates({
            lastSleptUpdateNotifier: Date.now() - 1000,
            releaseType: release.RELEASE_TYPE.SNAPSHOT
          });

          m.chai.expect(result).to.be.true;
        });

        it('should return true if releaseType is unknown', function() {
          const result = UpdateNotifierService.shouldCheckForUpdates({
            lastSleptUpdateNotifier: Date.now() - 1000,
            releaseType: release.RELEASE_TYPE.UNKNOWN
          });

          m.chai.expect(result).to.be.true;
        });

      });

      describe('given the `lastSleptUpdateNotifier` was updated in the future', function() {

        it('should return false if releaseType is production', function() {
          const result = UpdateNotifierService.shouldCheckForUpdates({
            lastSleptUpdateNotifier: Date.now() + 1000,
            releaseType: release.RELEASE_TYPE.PRODUCTION
          });

          m.chai.expect(result).to.be.false;
        });

        it('should return true if releaseType is snapshot', function() {
          const result = UpdateNotifierService.shouldCheckForUpdates({
            lastSleptUpdateNotifier: Date.now() + 1000,
            releaseType: release.RELEASE_TYPE.SNAPSHOT
          });

          m.chai.expect(result).to.be.true;
        });

        it('should return true if releaseType is unknown', function() {
          const result = UpdateNotifierService.shouldCheckForUpdates({
            lastSleptUpdateNotifier: Date.now() + 1000,
            releaseType: release.RELEASE_TYPE.UNKNOWN
          });

          m.chai.expect(result).to.be.true;
        });

      });

      describe('given the `lastSleptUpdateNotifier` was updated far in the future', function() {

        it('should return false if releaseType is production', function() {
          const SLEEP_MS = units.daysToMilliseconds(UpdateNotifierService.UPDATE_NOTIFIER_SLEEP_DAYS);
          const result = UpdateNotifierService.shouldCheckForUpdates({
            lastSleptUpdateNotifier: Date.now() + SLEEP_MS + 1000,
            releaseType: release.RELEASE_TYPE.PRODUCTION
          });

          m.chai.expect(result).to.be.false;
        });

        it('should return true if releaseType is snapshot', function() {
          const SLEEP_MS = units.daysToMilliseconds(UpdateNotifierService.UPDATE_NOTIFIER_SLEEP_DAYS);
          const result = UpdateNotifierService.shouldCheckForUpdates({
            lastSleptUpdateNotifier: Date.now() + SLEEP_MS + 1000,
            releaseType: release.RELEASE_TYPE.SNAPSHOT
          });

          m.chai.expect(result).to.be.true;
        });

        it('should return true if releaseType is unknown', function() {
          const SLEEP_MS = units.daysToMilliseconds(UpdateNotifierService.UPDATE_NOTIFIER_SLEEP_DAYS);
          const result = UpdateNotifierService.shouldCheckForUpdates({
            lastSleptUpdateNotifier: Date.now() + SLEEP_MS + 1000,
            releaseType: release.RELEASE_TYPE.UNKNOWN
          });

          m.chai.expect(result).to.be.true;
        });

      });

      describe('given the `lastSleptUpdateNotifier` was updated long ago', function() {

        it('should return true if releaseType is production', function() {
          const SLEEP_MS = units.daysToMilliseconds(UpdateNotifierService.UPDATE_NOTIFIER_SLEEP_DAYS);
          const result = UpdateNotifierService.shouldCheckForUpdates({
            lastSleptUpdateNotifier: Date.now() - SLEEP_MS - 1000,
            releaseType: release.RELEASE_TYPE.PRODUCTION
          });

          m.chai.expect(result).to.be.true;
        });

        it('should return true if releaseType is snapshot', function() {
          const SLEEP_MS = units.daysToMilliseconds(UpdateNotifierService.UPDATE_NOTIFIER_SLEEP_DAYS);
          const result = UpdateNotifierService.shouldCheckForUpdates({
            lastSleptUpdateNotifier: Date.now() - SLEEP_MS - 1000,
            releaseType: release.RELEASE_TYPE.SNAPSHOT
          });

          m.chai.expect(result).to.be.true;
        });

        it('should return true if releaseType is unknown', function() {
          const SLEEP_MS = units.daysToMilliseconds(UpdateNotifierService.UPDATE_NOTIFIER_SLEEP_DAYS);
          const result = UpdateNotifierService.shouldCheckForUpdates({
            lastSleptUpdateNotifier: Date.now() - SLEEP_MS - 1000,
            releaseType: release.RELEASE_TYPE.UNKNOWN
          });

          m.chai.expect(result).to.be.true;
        });

      });

    });

  });

});
