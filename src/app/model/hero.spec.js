"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var hero_1 = require("./hero");
var settings_1 = require("./settings");
var thedb_1 = require("./thedb");
describe('Hero', function () {
    // Using globs for sharing variables because using "this" for shared variables makes typescript compiler throw noImplicitAny errors
    var globals = {
        hero: new hero_1.Hero(),
        heroId: 11,
        name: 'Mr. Nice',
        count: 5,
        newName: 'a silly name',
    };
    var insertHero = function () {
        var hero = new hero_1.Hero();
        hero.name = globals.newName;
        return hero.insert()
            .then(function () {
            return hero;
        });
    };
    beforeEach(function (done) {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 999999;
        settings_1.Settings.initialize();
        thedb_1.TheDb.openDb(settings_1.Settings.dbPath)
            .then(thedb_1.TheDb.resetDbKarma)
            .then(function () {
            return hero_1.Hero.get(globals.heroId);
        })
            .then(function (hero) {
            globals.hero = hero;
            done();
        })
            .catch(function (reason) {
            throw reason;
        });
    });
    it('getHero()', function (done) {
        hero_1.Hero.get(globals.heroId)
            .then(function (hero) {
            expect(hero.name).toBe(globals.name);
            done();
        });
    });
    it('getHero(-1)', function (done) {
        hero_1.Hero.get(-1)
            .catch(function (reason) {
            expect(reason).toBeDefined();
            done();
        });
    });
    it('getHeroes()', function (done) {
        hero_1.Hero.getAll()
            .then(function (heroes) {
            expect(heroes.length).toBe(globals.count);
            done();
        });
    });
    it('insertHero()', function (done) {
        insertHero()
            .then(function (hero) {
            return hero_1.Hero.get(hero.id);
        })
            .then(function (insertedHero) {
            expect(insertedHero.name).toBe(globals.newName);
            done();
        })
            .catch(function (reason) {
            fail(reason);
            done();
        });
    });
    it('deleteHero()', function (done) {
        globals.hero.delete()
            .then(hero_1.Hero.getAll)
            .then(function (heroes) {
            var index = heroes.findIndex(function (item) { return item.id === globals.heroId; });
            expect(index).toBe(-1);
            done();
        })
            .catch(function (reason) {
            expect(reason.message).toContain('Expected to get Hero transaction, found 0');
            done();
        });
    });
});
//# sourceMappingURL=hero.spec.js.map