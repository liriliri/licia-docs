// Built by eustia.
/* eslint-disable */
"use strict";

var _ = {};

/* ------------------------------ has ------------------------------ */

var has = _.has = (function (exports) {
    /* Checks if key is a direct property.
     *
     * |Name  |Type   |Desc                            |
     * |------|-------|--------------------------------|
     * |obj   |object |Object to query                 |
     * |key   |string |Path to check                   |
     * |return|boolean|True if key is a direct property|
     */

    /* example
     * has({one: 1}, 'one'); // -> true
     */

    /* typescript
     * export declare function has(obj: {}, key: string): boolean;
     */
    var hasOwnProp = Object.prototype.hasOwnProperty;

    exports = function exports(obj, key) {
        return hasOwnProp.call(obj, key);
    };

    return exports;
})({});

/* ------------------------------ types ------------------------------ */

var types = _.types = (function (exports) {
    /* Used for typescript definitions only.
     */

    /* typescript
     * export declare namespace types {
     *     interface Collection<T> {}
     *     interface List<T> extends Collection<T> {
     *         [index: number]: T;
     *         length: number;
     *     }
     *     interface ListIterator<T, TResult> {
     *         (value: T, index: number, list: List<T>): TResult;
     *     }
     *     interface Dictionary<T> extends Collection<T> {
     *         [index: string]: T;
     *     }
     *     interface ObjectIterator<T, TResult> {
     *         (element: T, key: string, list: Dictionary<T>): TResult;
     *     }
     *     interface MemoIterator<T, TResult> {
     *         (prev: TResult, curr: T, index: number, list: List<T>): TResult;
     *     }
     *     interface MemoObjectIterator<T, TResult> {
     *         (prev: TResult, curr: T, key: string, list: Dictionary<T>): TResult;
     *     }
     * }
     * export declare const types: {}
     */
    exports = {};

    return exports;
})({});

/* ------------------------------ endWith ------------------------------ */
_.endWith = (function (exports) {
    /* Check if string ends with the given target string.
     *
     * |Name  |Type   |Desc                           |
     * |------|-------|-------------------------------|
     * |str   |string |The string to search           |
     * |suffix|string |String suffix                  |
     * |return|boolean|True if string ends with target|
     */

    /* example
     * endWith('ab', 'b'); // -> true
     */

    /* typescript
     * export declare function endWith(str: string, suffix: string): boolean;
     */
    exports = function exports(str, suffix) {
        var idx = str.length - suffix.length;
        return idx >= 0 && str.indexOf(suffix, idx) === idx;
    };

    return exports;
})({});

/* ------------------------------ objToStr ------------------------------ */

var objToStr = _.objToStr = (function (exports) {
    /* Alias of Object.prototype.toString.
     *
     * |Name  |Type  |Desc                                |
     * |------|------|------------------------------------|
     * |val   |*     |Source value                        |
     * |return|string|String representation of given value|
     */

    /* example
     * objToStr(5); // -> '[object Number]'
     */

    /* typescript
     * export declare function objToStr(val: any): string;
     */
    var ObjToStr = Object.prototype.toString;

    exports = function exports(val) {
        return ObjToStr.call(val);
    };

    return exports;
})({});

/* ------------------------------ isArr ------------------------------ */

var isArr = _.isArr = (function (exports) {
    /* Check if value is an `Array` object.
     *
     * |Name  |Type   |Desc                              |
     * |------|-------|----------------------------------|
     * |val   |*      |Value to check                    |
     * |return|boolean|True if value is an `Array` object|
     */

    /* example
     * isArr([]); // -> true
     * isArr({}); // -> false
     */

    /* typescript
     * export declare function isArr(val: any): boolean;
     */

    /* dependencies
     * objToStr 
     */

    exports =
        Array.isArray ||
        function(val) {
            return objToStr(val) === '[object Array]';
        };

    return exports;
})({});

/* ------------------------------ castPath ------------------------------ */

var castPath = _.castPath = (function (exports) {
    /* Cast value into a property path array.
     *
     * |Name  |Type        |Desc               |
     * |------|------------|-------------------|
     * |path  |string array|Value to inspect   |
     * |[obj] |object      |Object to query    |
     * |return|array       |Property path array|
     */

    /* example
     * castPath('a.b.c'); // -> ['a', 'b', 'c']
     * castPath(['a']); // -> ['a']
     * castPath('a[0].b'); // -> ['a', '0', 'b']
     * castPath('a.b.c', {'a.b.c': true}); // -> ['a.b.c']
     */

    /* typescript
     * export declare function castPath(path: string | string[], obj?: any): string[];
     */

    /* dependencies
     * has isArr 
     */

    exports = function exports(str, obj) {
        if (isArr(str)) return str;
        if (obj && has(obj, str)) return [str];
        var ret = [];
        str.replace(regPropName, function(match, number, quote, str) {
            ret.push(quote ? str.replace(regEscapeChar, '$1') : number || match);
        });
        return ret;
    }; // Lodash _stringToPath

    var regPropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
        regEscapeChar = /\\(\\)?/g;

    return exports;
})({});

/* ------------------------------ isNum ------------------------------ */

var isNum = _.isNum = (function (exports) {
    /* Check if value is classified as a Number primitive or object.
     *
     * |Name  |Type   |Desc                                 |
     * |------|-------|-------------------------------------|
     * |val   |*      |Value to check                       |
     * |return|boolean|True if value is correctly classified|
     */

    /* example
     * isNum(5); // -> true
     * isNum(5.1); // -> true
     * isNum({}); // -> false
     */

    /* typescript
     * export declare function isNum(val: any): boolean;
     */

    /* dependencies
     * objToStr 
     */

    exports = function exports(val) {
        return objToStr(val) === '[object Number]';
    };

    return exports;
})({});

/* ------------------------------ isFn ------------------------------ */

var isFn = _.isFn = (function (exports) {
    /* Check if value is a function.
     *
     * |Name  |Type   |Desc                       |
     * |------|-------|---------------------------|
     * |val   |*      |Value to check             |
     * |return|boolean|True if value is a function|
     *
     * Generator function is also classified as true.
     */

    /* example
     * isFn(function() {}); // -> true
     * isFn(function*() {}); // -> true
     */

    /* typescript
     * export declare function isFn(val: any): boolean;
     */

    /* dependencies
     * objToStr 
     */

    exports = function exports(val) {
        var objStr = objToStr(val);
        return (
            objStr === '[object Function]' ||
            objStr === '[object GeneratorFunction]'
        );
    };

    return exports;
})({});

/* ------------------------------ isArrLike ------------------------------ */

var isArrLike = _.isArrLike = (function (exports) {
    /* Check if value is array-like.
     *
     * |Name  |Type   |Desc                       |
     * |------|-------|---------------------------|
     * |val   |*      |Value to check             |
     * |return|boolean|True if value is array like|
     *
     * Function returns false.
     */

    /* example
     * isArrLike('test'); // -> true
     * isArrLike(document.body.children); // -> true;
     * isArrLike([1, 2, 3]); // -> true
     */

    /* typescript
     * export declare function isArrLike(val: any): boolean;
     */

    /* dependencies
     * isNum isFn 
     */

    var MAX_ARR_IDX = Math.pow(2, 53) - 1;

    exports = function exports(val) {
        if (!val) return false;
        var len = val.length;
        return isNum(len) && len >= 0 && len <= MAX_ARR_IDX && !isFn(val);
    };

    return exports;
})({});

/* ------------------------------ isBrowser ------------------------------ */

var isBrowser = _.isBrowser = (function (exports) {
    function _typeof(obj) {
        if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
            _typeof = function _typeof(obj) {
                return typeof obj;
            };
        } else {
            _typeof = function _typeof(obj) {
                return obj &&
                    typeof Symbol === 'function' &&
                    obj.constructor === Symbol &&
                    obj !== Symbol.prototype
                    ? 'symbol'
                    : typeof obj;
            };
        }
        return _typeof(obj);
    }

    /* Check if running in a browser.
     */

    /* example
     * console.log(isBrowser); // -> true if running in a browser
     */

    /* typescript
     * export declare const isBrowser: boolean;
     */
    exports =
        (typeof window === 'undefined' ? 'undefined' : _typeof(window)) ===
            'object' &&
        (typeof document === 'undefined' ? 'undefined' : _typeof(document)) ===
            'object' &&
        document.nodeType === 9;

    return exports;
})({});

/* ------------------------------ root ------------------------------ */

var root = _.root = (function (exports) {
    /* Root object reference, `global` in nodeJs, `window` in browser. */

    /* typescript
     * export declare const root: any;
     */

    /* dependencies
     * isBrowser 
     */

    exports = isBrowser ? window : global;

    return exports;
})({});

/* ------------------------------ detectMocha ------------------------------ */

var detectMocha = _.detectMocha = (function (exports) {
    /* Detect if mocha is running.
     */

    /* example
     * detectMocha(); // -> True if mocha is running.
     */

    /* typescript
     * export declare function detectMocha(): boolean;
     */

    /* dependencies
     * root 
     */

    exports = function exports() {
        for (var i = 0, len = methods.length; i < len; i++) {
            var method = methods[i];
            if (typeof root[method] !== 'function') return false;
        }

        return true;
    };

    var methods = ['afterEach', 'after', 'beforeEach', 'before', 'describe', 'it'];

    return exports;
})({});

/* ------------------------------ keys ------------------------------ */

var keys = _.keys = (function (exports) {
    /* Create an array of the own enumerable property names of object.
     *
     * |Name  |Type  |Desc                   |
     * |------|------|-----------------------|
     * |obj   |object|Object to query        |
     * |return|array |Array of property names|
     */

    /* example
     * keys({a: 1}); // -> ['a']
     */

    /* typescript
     * export declare function keys(obj: any): string[];
     */

    /* dependencies
     * has detectMocha 
     */

    if (Object.keys && !detectMocha()) {
        exports = Object.keys;
    } else {
        exports = function exports(obj) {
            var ret = [],
                key;

            for (key in obj) {
                if (has(obj, key)) ret.push(key);
            }

            return ret;
        };
    }

    return exports;
})({});

/* ------------------------------ isUndef ------------------------------ */

var isUndef = _.isUndef = (function (exports) {
    /* Check if value is undefined.
     *
     * |Name  |Type   |Desc                      |
     * |------|-------|--------------------------|
     * |val   |*      |Value to check            |
     * |return|boolean|True if value is undefined|
     */

    /* example
     * isUndef(void 0); // -> true
     * isUndef(null); // -> false
     */

    /* typescript
     * export declare function isUndef(val: any): boolean;
     */
    exports = function exports(val) {
        return val === void 0;
    };

    return exports;
})({});

/* ------------------------------ optimizeCb ------------------------------ */

var optimizeCb = _.optimizeCb = (function (exports) {
    /* Used for function context binding.
     */

    /* typescript
     * export declare function optimizeCb(fn: Function, ctx: any, argCount?: number): Function;
     */

    /* dependencies
     * isUndef 
     */

    exports = function exports(fn, ctx, argCount) {
        if (isUndef(ctx)) return fn;

        switch (argCount == null ? 3 : argCount) {
            case 1:
                return function(val) {
                    return fn.call(ctx, val);
                };

            case 3:
                return function(val, idx, collection) {
                    return fn.call(ctx, val, idx, collection);
                };

            case 4:
                return function(accumulator, val, idx, collection) {
                    return fn.call(ctx, accumulator, val, idx, collection);
                };
        }

        return function() {
            return fn.apply(ctx, arguments);
        };
    };

    return exports;
})({});

/* ------------------------------ each ------------------------------ */

var each = _.each = (function (exports) {
    /* Iterate over elements of collection and invokes iterator for each element.
     *
     * |Name    |Type        |Desc                          |
     * |--------|------------|------------------------------|
     * |obj     |object array|Collection to iterate over    |
     * |iterator|function    |Function invoked per iteration|
     * |[ctx]   |*           |Function context              |
     */

    /* example
     * each({'a': 1, 'b': 2}, function (val, key) {});
     */

    /* typescript
     * export declare function each<T>(
     *     list: types.List<T>,
     *     iterator: types.ListIterator<T, void>,
     *     ctx?: any
     * ): types.List<T>;
     * export declare function each<T>(
     *     object: types.Dictionary<T>,
     *     iterator: types.ObjectIterator<T, void>,
     *     ctx?: any
     * ): types.Collection<T>;
     */

    /* dependencies
     * isArrLike keys optimizeCb types 
     */

    exports = function exports(obj, iterator, ctx) {
        iterator = optimizeCb(iterator, ctx);
        var i, len;

        if (isArrLike(obj)) {
            for (i = 0, len = obj.length; i < len; i++) {
                iterator(obj[i], i, obj);
            }
        } else {
            var _keys = keys(obj);

            for (i = 0, len = _keys.length; i < len; i++) {
                iterator(obj[_keys[i]], _keys[i], obj);
            }
        }

        return obj;
    };

    return exports;
})({});

/* ------------------------------ nextTick ------------------------------ */

var nextTick = _.nextTick = (function (exports) {
    function _typeof(obj) {
        if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
            _typeof = function _typeof(obj) {
                return typeof obj;
            };
        } else {
            _typeof = function _typeof(obj) {
                return obj &&
                    typeof Symbol === 'function' &&
                    obj.constructor === Symbol &&
                    obj !== Symbol.prototype
                    ? 'symbol'
                    : typeof obj;
            };
        }
        return _typeof(obj);
    }

    /* Next tick for both node and browser.
     *
     * |Name|Type    |Desc            |
     * |----|--------|----------------|
     * |cb  |function|Function to call|
     *
     * Use process.nextTick if available.
     *
     * Otherwise setImmediate or setTimeout is used as fallback.
     */

    /* example
     * nextTick(function () {
     *     // Do something...
     * });
     */

    /* typescript
     * export declare function nextTick(cb: Function): void;
     */
    if (
        (typeof process === 'undefined' ? 'undefined' : _typeof(process)) ===
            'object' &&
        process.nextTick
    ) {
        exports = process.nextTick;
    } else if (typeof setImmediate === 'function') {
        exports = function exports(cb) {
            setImmediate(ensureCallable(cb));
        };
    } else {
        exports = function exports(cb) {
            setTimeout(ensureCallable(cb), 0);
        };
    }

    function ensureCallable(fn) {
        if (typeof fn !== 'function')
            throw new TypeError(fn + ' is not a function');
        return fn;
    }

    return exports;
})({});

/* ------------------------------ noop ------------------------------ */

var noop = _.noop = (function (exports) {
    /* A no-operation function.
     */

    /* example
     * noop(); // Does nothing
     */

    /* typescript
     * export declare function noop(): void;
     */
    exports = function exports() {};

    return exports;
})({});

/* ------------------------------ parallel ------------------------------ */

var parallel = _.parallel = (function (exports) {
    /* Run an array of functions in parallel.
     *
     * |Name |Type    |Desc                   |
     * |-----|--------|-----------------------|
     * |tasks|array   |Array of functions     |
     * |[cb] |function|Callback once completed|
     */

    /* example
     * parallel([
     *     function(cb) {
     *         setTimeout(function () { cb(null, 'one') }, 200);
     *     },
     *     function(cb) {
     *         setTimeout(function () { cb(null, 'two') }, 100);
     *     }
     * ], function (err, results) {
     *     // results -> ['one', 'two']
     * });
     */

    /* typescript
     * export declare function parallel(tasks: Function[], cb?: Function): void;
     */

    /* dependencies
     * noop each nextTick 
     */

    exports = function exports(tasks, cb) {
        cb = cb || noop;
        var results = [],
            pending = tasks.length;
        if (!pending) return done(null);
        each(tasks, function(task, i) {
            task(function(err, result) {
                taskCb(i, err, result);
            });
        });

        function taskCb(i, err, result) {
            results[i] = result;
            if (--pending === 0 || err) done(err);
        }

        function done(err) {
            nextTick(function() {
                cb(err, results);
                cb = noop;
            });
        }
    };

    return exports;
})({});

/* ------------------------------ rmdir ------------------------------ */
_.rmdir = (function (exports) {
    /* Recursively remove directories.
     *
     * |Name    |Type    |Desc               |
     * |--------|--------|-------------------|
     * |dir     |string  |Directory to remove|
     * |callback|function|Callback           |
     */

    /* example
     * rmdir('/tmp/foo/bar/baz', function (err) {
     *     if (err) console.log (err);
     *     else console.log('Done');
     * });
     */

    /* typescript
     * export declare function rmdir(dir: string, cb?: Function): void;
     */

    /* dependencies
     * noop parallel 
     */

    var fs = require('fs'),
        path = require('path');

    exports = function(p, cb) {
        cb = cb || noop;
        p = path.resolve(p);

        fs.lstat(p, function(err, stat) {
            if (err) return cb(err);

            var isDir = stat.isDirectory();

            if (!isDir) {
                return fs.unlink(p, function(err) {
                    return err ? cb(err) : cb();
                });
            }

            fs.readdir(p, function(err, files) {
                if (err) return cb(err);

                var len = files.length;

                var cbs = [];
                for (var i = 0; i < len; i++) {
                    cbs.push(
                        (function(file) {
                            return function(cb) {
                                exports(file, cb);
                            };
                        })(path.resolve(p, files[i]))
                    );
                }

                parallel(cbs, function(err) {
                    if (err) return cb(err);

                    fs.rmdir(p, function(err) {
                        return err ? cb(err) : cb();
                    });
                });
            });
        });
    };

    return exports;
})({});

/* ------------------------------ safeGet ------------------------------ */
_.safeGet = (function (exports) {
    /* Get object property, don't throw undefined error.
     *
     * |Name  |Type        |Desc                     |
     * |------|------------|-------------------------|
     * |obj   |object      |Object to query          |
     * |path  |array string|Path of property to get  |
     * |return|*           |Target value or undefined|
     */

    /* example
     * var obj = {a: {aa: {aaa: 1}}};
     * safeGet(obj, 'a.aa.aaa'); // -> 1
     * safeGet(obj, ['a', 'aa']); // -> {aaa: 1}
     * safeGet(obj, 'a.b'); // -> undefined
     */

    /* typescript
     * export declare function safeGet(obj: any, path: string | string[]): any;
     */

    /* dependencies
     * isUndef castPath 
     */

    exports = function exports(obj, path) {
        path = castPath(path, obj);
        var prop;
        prop = path.shift();

        while (!isUndef(prop)) {
            obj = obj[prop];
            if (obj == null) return;
            prop = path.shift();
        }

        return obj;
    };

    return exports;
})({});

module.exports = _;