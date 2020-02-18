"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//noinspection TypeScriptCheckImport
const fs_1 = require("fs");
const path = require("path");
const electron_1 = require("electron");
/**
 * Class Settings holds information required by the application.
 * Settings uses settings.json to persist relevant information across sessions.
 *
 * @export
 * @class Settings
 */
class Settings {
    /**
     * Settings.initialize must be called at startup of application and determines the locations of database
     *
     * @static
     * @memberof Settings
     */
    static initialize() {
        Settings.getPaths();
        if (!Settings.hasFixedDbLocation) {
            if (!fs_1.existsSync(Settings.settingsPath)) {
                Settings.write();
            }
            Settings.read();
        }
    }
    static read() {
        const settings = JSON.parse(fs_1.readFileSync(Settings.settingsPath, { encoding: 'utf8' }));
        Settings.fromJson(settings);
    }
    static write() {
        fs_1.writeFileSync(Settings.settingsPath, JSON.stringify({
            dbPath: Settings.dbPath,
        }, undefined, 4));
    }
    static getPaths() {
        if (/karma/.test(electron_1.remote.app.getPath('userData'))) {
            const karmaPath = electron_1.remote.app.getAppPath();
            const appPath = karmaPath.slice(0, karmaPath.indexOf('node_modules'));
            Settings.hasFixedDbLocation = true;
            Settings.dbFolder = path.join(appPath, Settings.dataFolderKarma);
            Settings.dbPath = path.join(Settings.dbFolder, Settings.dbNameKarma);
        }
        else {
            const appPath = electron_1.remote.app.getAppPath();
            if (Settings.hasFixedDbLocation) {
                Settings.dbPath = path.join(electron_1.remote.app.getPath(Settings.fixedLocation), 'data', Settings.dbName);
            }
            else {
                Settings.settingsPath = path.join(electron_1.remote.app.getPath('userData'), 'settings.json');
            }
            //noinspection TypeScriptUnresolvedFunction
            // const isDevMode = /[eE]lectron/.test(path.basename(remote.app.getPath('exe'), '.exe'));
            //  if (isDevMode) {
            Settings.dbFolder = path.join(appPath, Settings.dataSubFolder);
            // } else {
            //     // remote.process.resoursesPath yields undefined
            //     Settings.dbFolder = path.join(remote.getGlobal('process').resourcesPath, Settings.dataSubFolder);
            // }
        }
    }
    static fromJson(settings) {
        Settings.dbPath = settings['dbPath'];
    }
}
/** Determines if database location can be set by user (false), or is fixed by application (true). */
Settings.hasFixedDbLocation = false;
/**
 * Sets database location when hasFixedDbLocation === true.
 * For valid values see https://github.com/electron/electron/blob/master/docs/api/app.md#appgetpathname.
 */
Settings.fixedLocation = 'userData';
/** Default name of folder containing data files. */
Settings.dataSubFolder = 'dist/assets/data';
/** Default name of database file. */
Settings.dbName = 'database.db';
/** Default name of folder containing data files for Karma. */
Settings.dataFolderKarma = '/assets/data';
/** Default name of database file for Karma tests. */
Settings.dbNameKarma = 'karma-database.db';
exports.Settings = Settings;
//# sourceMappingURL=settings.js.map