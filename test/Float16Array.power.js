var _PowerAssertRecorder1 = function () {
    function PowerAssertRecorder() {
        this.captured = [];
    }
    PowerAssertRecorder.prototype._capt = function _capt(value, espath) {
        this.captured.push({
            value: value,
            espath: espath
        });
        return value;
    };
    PowerAssertRecorder.prototype._expr = function _expr(value, source) {
        var capturedValues = this.captured;
        this.captured = [];
        return {
            powerAssertContext: {
                value: value,
                events: capturedValues
            },
            source: source
        };
    };
    return PowerAssertRecorder;
}();
describe('Float16Array', () => {
    let detach;
    let AnotherRealmFloat16Array;
    before(async function () {
        assert.equalFloat16ArrayValues = function (_float16, _array) {
            var _rec1 = new _PowerAssertRecorder1();
            var _rec2 = new _PowerAssertRecorder1();
            const float16 = [];
            for (let i = 0, l = _float16.length; i < l; ++i) {
                if (typeof window !== 'undefined' && Number.isNaN(_float16[i])) {
                    float16[i] = 'NaN';
                } else {
                    float16[i] = _float16[i];
                }
            }
            const array = [];
            for (let i = 0, l = _array.length; i < l; ++i) {
                if (typeof window !== 'undefined' && Number.isNaN(_array[i])) {
                    array[i] = 'NaN';
                } else {
                    array[i] = _array[i];
                }
            }
            assert.deepStrictEqual(_rec1._expr(_rec1._capt(float16, 'arguments/0'), {
                content: 'assert.deepStrictEqual(float16, array)',
                filepath: 'test/Float16Array.js',
                line: 28
            }), _rec2._expr(_rec2._capt(array, 'arguments/1'), {
                content: 'assert.deepStrictEqual(float16, array)',
                filepath: 'test/Float16Array.js',
                line: 28
            }));
        };
        if (typeof structuredClone !== 'undefined') {
            detach = buffer => {
                structuredClone(buffer, { transfer: [buffer] });
                return buffer;
            };
        }
        if (typeof window !== 'undefined') {
            const iframe = document.getElementById('realm');
            const iWindow = iframe.contentWindow;
            const iDocument = iframe.contentDocument;
            let success = false;
            if (iDocument.readyState !== 'complete' || iDocument.getElementById('float16') === null) {
                try {
                    await new Promise((resolve, reject) => {
                        const id = setTimeout(() => reject(new Error('Timeout Error')), 10000);
                        iframe.addEventListener('load', () => {
                            clearTimeout(id);
                            resolve();
                        }, { once: true });
                    });
                    success = true;
                } catch (e) {
                    console.error(e);
                }
            } else {
                success = true;
            }
            if (success) {
                AnotherRealmFloat16Array = iWindow.float16.Float16Array;
            }
        }
    });
    after(() => {
        assert.equalFloat16ArrayValues = null;
    });
    it('property `name` is \'Float16Array\'', () => {
        var _rec3 = new _PowerAssertRecorder1();
        assert(_rec3._expr(_rec3._capt(_rec3._capt(_rec3._capt(Float16Array, 'arguments/0/left/object').name, 'arguments/0/left') === 'Float16Array', 'arguments/0'), {
            content: 'assert(Float16Array.name === "Float16Array")',
            filepath: 'test/Float16Array.js',
            line: 79
        }));
    });
    it('property `length` is 3', () => {
        var _rec4 = new _PowerAssertRecorder1();
        assert(_rec4._expr(_rec4._capt(_rec4._capt(_rec4._capt(Float16Array, 'arguments/0/left/object').length, 'arguments/0/left') === 3, 'arguments/0'), {
            content: 'assert(Float16Array.length === 3)',
            filepath: 'test/Float16Array.js',
            line: 83
        }));
    });
    it('property `BYTES_PER_ELEMENT` is 2', () => {
        var _rec5 = new _PowerAssertRecorder1();
        assert(_rec5._expr(_rec5._capt(_rec5._capt(_rec5._capt(Float16Array, 'arguments/0/left/object').BYTES_PER_ELEMENT, 'arguments/0/left') === 2, 'arguments/0'), {
            content: 'assert(Float16Array.BYTES_PER_ELEMENT === 2)',
            filepath: 'test/Float16Array.js',
            line: 87
        }));
    });
    it('set & get values', () => {
        var _rec6 = new _PowerAssertRecorder1();
        var _rec7 = new _PowerAssertRecorder1();
        var _rec8 = new _PowerAssertRecorder1();
        var _rec9 = new _PowerAssertRecorder1();
        var _rec10 = new _PowerAssertRecorder1();
        const float16 = new Float16Array(4);
        float16[0] = 1.337;
        float16[1] = Number.MAX_VALUE;
        float16[2] = Number.MIN_VALUE;
        float16[3] = 'aaa';
        assert.equalFloat16ArrayValues(float16, [
            1.3369140625,
            Infinity,
            0,
            NaN
        ]);
        float16.foo = 'foo';
        assert(_rec6._expr(_rec6._capt(_rec6._capt(_rec6._capt(float16, 'arguments/0/left/object').foo, 'arguments/0/left') === 'foo', 'arguments/0'), {
            content: 'assert(float16.foo === "foo")',
            filepath: 'test/Float16Array.js',
            line: 102
        }));
        float16[0.5] = 1;
        assert(_rec7._expr(_rec7._capt(_rec7._capt(_rec7._capt(float16, 'arguments/0/left/object')[0.5], 'arguments/0/left') === _rec7._capt(undefined, 'arguments/0/right'), 'arguments/0'), {
            content: 'assert(float16[0.5] === undefined)',
            filepath: 'test/Float16Array.js',
            line: 106
        }));
        float16[10] = 2;
        assert(_rec8._expr(_rec8._capt(_rec8._capt(_rec8._capt(float16, 'arguments/0/left/object')[10], 'arguments/0/left') === _rec8._capt(undefined, 'arguments/0/right'), 'arguments/0'), {
            content: 'assert(float16[10] === undefined)',
            filepath: 'test/Float16Array.js',
            line: 110
        }));
        float16[Infinity] = 3;
        assert(_rec9._expr(_rec9._capt(_rec9._capt(_rec9._capt(float16, 'arguments/0/left/object')[_rec9._capt(Infinity, 'arguments/0/left/property')], 'arguments/0/left') === _rec9._capt(undefined, 'arguments/0/right'), 'arguments/0'), {
            content: 'assert(float16[Infinity] === undefined)',
            filepath: 'test/Float16Array.js',
            line: 114
        }));
        float16['-0'] = 4;
        assert(_rec10._expr(_rec10._capt(_rec10._capt(_rec10._capt(float16, 'arguments/0/left/object')['-0'], 'arguments/0/left') === _rec10._capt(undefined, 'arguments/0/right'), 'arguments/0'), {
            content: 'assert(float16["-0"] === undefined)',
            filepath: 'test/Float16Array.js',
            line: 118
        }));
    });
    it('get own property descriptors', () => {
        var _rec11 = new _PowerAssertRecorder1();
        var _rec12 = new _PowerAssertRecorder1();
        const float16 = new Float16Array(1);
        const float32 = new Float32Array(1);
        float16[0] = float32[0] = 1.5;
        assert.deepStrictEqual(_rec11._expr(_rec11._capt(_rec11._capt(Object, 'arguments/0/callee/object').getOwnPropertyDescriptors(_rec11._capt(float16, 'arguments/0/arguments/0')), 'arguments/0'), {
            content: 'assert.deepStrictEqual(Object.getOwnPropertyDescriptors(float16), Object.getOwnPropertyDescriptors(float32))',
            filepath: 'test/Float16Array.js',
            line: 127
        }), _rec12._expr(_rec12._capt(_rec12._capt(Object, 'arguments/1/callee/object').getOwnPropertyDescriptors(_rec12._capt(float32, 'arguments/1/arguments/0')), 'arguments/1'), {
            content: 'assert.deepStrictEqual(Object.getOwnPropertyDescriptors(float16), Object.getOwnPropertyDescriptors(float32))',
            filepath: 'test/Float16Array.js',
            line: 127
        }));
    });
    it('define properties', function () {
        var _rec13 = new _PowerAssertRecorder1();
        try {
            const float32 = new Float32Array(1);
            Object.defineProperty(float32, 0, { value: 1 });
        } catch (e) {
            this.skip();
        }
        const float16 = new Float16Array(5);
        Object.defineProperty(float16, 0, { value: 1.337 });
        Object.defineProperty(float16, 1, { value: Number.MAX_VALUE });
        Object.defineProperty(float16, 2, { value: Number.MIN_VALUE });
        Object.defineProperty(float16, 3, { value: 'aaa' });
        Object.defineProperty(float16, 4, {});
        assert.equalFloat16ArrayValues(float16, [
            1.3369140625,
            Infinity,
            0,
            NaN,
            0
        ]);
        Object.defineProperty(float16, 'foo', { value: 'foo' });
        assert(_rec13._expr(_rec13._capt(_rec13._capt(_rec13._capt(float16, 'arguments/0/left/object').foo, 'arguments/0/left') === 'foo', 'arguments/0'), {
            content: 'assert(float16.foo === "foo")',
            filepath: 'test/Float16Array.js',
            line: 153
        }));
        assert.throws(() => Object.defineProperty(float16, 0.5, { value: 1 }), TypeError);
        assert.throws(() => Object.defineProperty(float16, 10, { value: 2 }), TypeError);
        assert.throws(() => Object.defineProperty(float16, Infinity, { value: 3 }), TypeError);
        assert.throws(() => Object.defineProperty(float16, '-0', { value: 4 }), TypeError);
    });
    it('delete properties', () => {
        var _rec14 = new _PowerAssertRecorder1();
        var _rec15 = new _PowerAssertRecorder1();
        var _rec16 = new _PowerAssertRecorder1();
        const float16 = new Float16Array(1);
        float16[0] = 1.337;
        float16.foo = 1;
        delete float16[0];
        assert(_rec14._expr(_rec14._capt(_rec14._capt(_rec14._capt(float16, 'arguments/0/left/object')[0], 'arguments/0/left') === 1.3369140625, 'arguments/0'), {
            content: 'assert(float16[0] === 1.3369140625)',
            filepath: 'test/Float16Array.js',
            line: 175
        }));
        delete float16.foo;
        assert(_rec15._expr(_rec15._capt(_rec15._capt(_rec15._capt(float16, 'arguments/0/left/object').foo, 'arguments/0/left') === _rec15._capt(undefined, 'arguments/0/right'), 'arguments/0'), {
            content: 'assert(float16.foo === undefined)',
            filepath: 'test/Float16Array.js',
            line: 178
        }));
        assert(_rec16._expr(_rec16._capt(!_rec16._capt(_rec16._capt(_rec16._capt(_rec16._capt(Object, 'arguments/0/argument/callee/object/object/object').prototype, 'arguments/0/argument/callee/object/object').hasOwnProperty, 'arguments/0/argument/callee/object').call(_rec16._capt(float16, 'arguments/0/argument/arguments/0'), 'foo'), 'arguments/0/argument'), 'arguments/0'), {
            content: 'assert(!Object.prototype.hasOwnProperty.call(float16, "foo"))',
            filepath: 'test/Float16Array.js',
            line: 179
        }));
    });
    it('check own keys', () => {
        var _rec17 = new _PowerAssertRecorder1();
        var _rec18 = new _PowerAssertRecorder1();
        const float16 = new Float16Array([
            1,
            2
        ]);
        assert.deepStrictEqual(_rec17._expr(_rec17._capt(_rec17._capt(Reflect, 'arguments/0/callee/object').ownKeys(_rec17._capt(float16, 'arguments/0/arguments/0')), 'arguments/0'), {
            content: 'assert.deepStrictEqual(Reflect.ownKeys(float16), ["0","1"])',
            filepath: 'test/Float16Array.js',
            line: 184
        }), _rec18._expr(_rec18._capt([
            '0',
            '1'
        ], 'arguments/1'), {
            content: 'assert.deepStrictEqual(Reflect.ownKeys(float16), ["0","1"])',
            filepath: 'test/Float16Array.js',
            line: 184
        }));
    });
    it('iterate', () => {
        var _rec19 = new _PowerAssertRecorder1();
        const checkArray = [
            1,
            1.099609375,
            1.19921875,
            1.2998046875
        ];
        const float16 = new Float16Array([
            1,
            1.1,
            1.2,
            1.3
        ]);
        for (const val of float16) {
            assert(_rec19._expr(_rec19._capt(_rec19._capt(val, 'arguments/0/left') === _rec19._capt(_rec19._capt(checkArray, 'arguments/0/right/callee/object').shift(), 'arguments/0/right'), 'arguments/0'), {
                content: 'assert(val === checkArray.shift())',
                filepath: 'test/Float16Array.js',
                line: 192
            }));
        }
    });
    it('can\'t be frozen with elements', function () {
        try {
            Object.freeze(new Proxy({ foo: 1 }, {
                defineProperty() {
                    return false;
                }
            }));
            this.skip();
        } catch (e) {
        }
        assert.doesNotThrow(() => Object.freeze(new Float16Array()));
        assert.throws(() => Object.freeze(new Float16Array(4)), TypeError);
    });
    it('can\'t change property & prototype property if it frozen', function () {
        var _rec20 = new _PowerAssertRecorder1();
        var _rec21 = new _PowerAssertRecorder1();
        var _rec22 = new _PowerAssertRecorder1();
        const float16 = new Float16Array();
        float16.hoge = 'hoge';
        assert(_rec20._expr(_rec20._capt(_rec20._capt(_rec20._capt(float16, 'arguments/0/left/object').hoge, 'arguments/0/left') === 'hoge', 'arguments/0'), {
            content: 'assert(float16.hoge === "hoge")',
            filepath: 'test/Float16Array.js',
            line: 211
        }));
        Object.freeze(float16);
        float16.fuga = 'fuga';
        assert(_rec21._expr(_rec21._capt(_rec21._capt(_rec21._capt(float16, 'arguments/0/left/object').fuga, 'arguments/0/left') === _rec21._capt(undefined, 'arguments/0/right'), 'arguments/0'), {
            content: 'assert(float16.fuga === undefined)',
            filepath: 'test/Float16Array.js',
            line: 216
        }));
        float16.map = 'map';
        assert(_rec22._expr(_rec22._capt(_rec22._capt(typeof _rec22._capt(_rec22._capt(float16, 'arguments/0/left/argument/object').map, 'arguments/0/left/argument'), 'arguments/0/left') === 'function', 'arguments/0'), {
            content: 'assert(typeof float16.map === "function")',
            filepath: 'test/Float16Array.js',
            line: 219
        }));
    });
    it('`instanceof` operator', () => {
        var _rec23 = new _PowerAssertRecorder1();
        var _rec24 = new _PowerAssertRecorder1();
        const float16 = new Float16Array([
            1,
            1.1,
            1.2,
            1.3
        ]);
        assert(_rec23._expr(_rec23._capt(_rec23._capt(float16, 'arguments/0/left') instanceof _rec23._capt(Float16Array, 'arguments/0/right'), 'arguments/0'), {
            content: 'assert(float16 instanceof Float16Array)',
            filepath: 'test/Float16Array.js',
            line: 225
        }));
        assert(_rec24._expr(_rec24._capt(!_rec24._capt(_rec24._capt(float16, 'arguments/0/argument/left') instanceof _rec24._capt(Uint16Array, 'arguments/0/argument/right'), 'arguments/0/argument'), 'arguments/0'), {
            content: 'assert(!(float16 instanceof Uint16Array))',
            filepath: 'test/Float16Array.js',
            line: 226
        }));
    });
    it('prototype methods are as same as themselves', () => {
        var _rec25 = new _PowerAssertRecorder1();
        const float16 = new Float16Array();
        assert(_rec25._expr(_rec25._capt(_rec25._capt(_rec25._capt(_rec25._capt(Float16Array, 'arguments/0/left/object/object').prototype, 'arguments/0/left/object').map, 'arguments/0/left') === _rec25._capt(_rec25._capt(float16, 'arguments/0/right/object').map, 'arguments/0/right'), 'arguments/0'), {
            content: 'assert(Float16Array.prototype.map === float16.map)',
            filepath: 'test/Float16Array.js',
            line: 231
        }));
    });
    it('append custom methods (not using `super`)', () => {
        var _rec26 = new _PowerAssertRecorder1();
        const float16 = new Float16Array([
            1,
            2,
            3
        ]);
        float16.sum = function () {
            let ret = 0;
            for (let i = 0, l = this.length; i < l; ++i) {
                ret += this[i];
            }
            return ret;
        };
        assert(_rec26._expr(_rec26._capt(_rec26._capt(_rec26._capt(float16, 'arguments/0/left/callee/object').sum(), 'arguments/0/left') === 6, 'arguments/0'), {
            content: 'assert(float16.sum() === 6)',
            filepath: 'test/Float16Array.js',
            line: 245
        }));
    });
    describe('constructor', () => {
        it('input empty or primitive', () => {
            assert.doesNotThrow(() => new Float16Array());
            assert.doesNotThrow(() => new Float16Array(null));
            assert.doesNotThrow(() => new Float16Array(undefined));
            assert.doesNotThrow(() => new Float16Array(0));
            assert.doesNotThrow(() => new Float16Array(4));
            assert.throws(() => new Float16Array(-1), Error);
            assert.throws(() => new Float16Array(Symbol()), TypeError);
        });
        it('input Array or TypedArray', () => {
            var _rec27 = new _PowerAssertRecorder1();
            var _rec28 = new _PowerAssertRecorder1();
            var _rec29 = new _PowerAssertRecorder1();
            var _rec30 = new _PowerAssertRecorder1();
            var _rec31 = new _PowerAssertRecorder1();
            var _rec32 = new _PowerAssertRecorder1();
            var _rec33 = new _PowerAssertRecorder1();
            var _rec34 = new _PowerAssertRecorder1();
            const array = [
                1,
                1.1,
                1.2,
                1.3
            ];
            const checkArray = [
                1,
                1.099609375,
                1.19921875,
                1.2998046875
            ];
            const float16_1 = new Float16Array(array);
            assert(_rec27._expr(_rec27._capt(_rec27._capt(_rec27._capt(float16_1, 'arguments/0/left/object').BYTES_PER_ELEMENT, 'arguments/0/left') === 2, 'arguments/0'), {
                content: 'assert(float16_1.BYTES_PER_ELEMENT === 2)',
                filepath: 'test/Float16Array.js',
                line: 266
            }));
            assert(_rec28._expr(_rec28._capt(_rec28._capt(_rec28._capt(float16_1, 'arguments/0/left/object').byteOffset, 'arguments/0/left') === 0, 'arguments/0'), {
                content: 'assert(float16_1.byteOffset === 0)',
                filepath: 'test/Float16Array.js',
                line: 267
            }));
            assert(_rec29._expr(_rec29._capt(_rec29._capt(_rec29._capt(float16_1, 'arguments/0/left/object').byteLength, 'arguments/0/left') === 8, 'arguments/0'), {
                content: 'assert(float16_1.byteLength === 8)',
                filepath: 'test/Float16Array.js',
                line: 268
            }));
            assert(_rec30._expr(_rec30._capt(_rec30._capt(_rec30._capt(float16_1, 'arguments/0/left/object').length, 'arguments/0/left') === 4, 'arguments/0'), {
                content: 'assert(float16_1.length === 4)',
                filepath: 'test/Float16Array.js',
                line: 269
            }));
            assert.equalFloat16ArrayValues(float16_1, checkArray);
            const float16_2 = new Float16Array(new Float32Array(array));
            assert(_rec31._expr(_rec31._capt(_rec31._capt(_rec31._capt(float16_2, 'arguments/0/left/object').BYTES_PER_ELEMENT, 'arguments/0/left') === 2, 'arguments/0'), {
                content: 'assert(float16_2.BYTES_PER_ELEMENT === 2)',
                filepath: 'test/Float16Array.js',
                line: 274
            }));
            assert(_rec32._expr(_rec32._capt(_rec32._capt(_rec32._capt(float16_2, 'arguments/0/left/object').byteOffset, 'arguments/0/left') === 0, 'arguments/0'), {
                content: 'assert(float16_2.byteOffset === 0)',
                filepath: 'test/Float16Array.js',
                line: 275
            }));
            assert(_rec33._expr(_rec33._capt(_rec33._capt(_rec33._capt(float16_2, 'arguments/0/left/object').byteLength, 'arguments/0/left') === 8, 'arguments/0'), {
                content: 'assert(float16_2.byteLength === 8)',
                filepath: 'test/Float16Array.js',
                line: 276
            }));
            assert(_rec34._expr(_rec34._capt(_rec34._capt(_rec34._capt(float16_2, 'arguments/0/left/object').length, 'arguments/0/left') === 4, 'arguments/0'), {
                content: 'assert(float16_2.length === 4)',
                filepath: 'test/Float16Array.js',
                line: 277
            }));
            assert.equalFloat16ArrayValues(float16_2, checkArray);
        });
        it('input BigInt TypedArray', function () {
            if (typeof BigUint64Array === 'undefined') {
                this.skip();
            }
            assert.throws(() => new Float16Array(new BigUint64Array()), TypeError);
        });
        it('input custom Array', () => {
            var _rec35 = new _PowerAssertRecorder1();
            var _rec36 = new _PowerAssertRecorder1();
            var _rec37 = new _PowerAssertRecorder1();
            var _rec38 = new _PowerAssertRecorder1();
            var _rec39 = new _PowerAssertRecorder1();
            var _rec40 = new _PowerAssertRecorder1();
            var _rec41 = new _PowerAssertRecorder1();
            var _rec42 = new _PowerAssertRecorder1();
            class FooArray extends Array {
            }
            const array = FooArray.from([
                1,
                1.1,
                1.2,
                1.3
            ]);
            const checkArray = [
                1,
                1.099609375,
                1.19921875,
                1.2998046875
            ];
            const float16_1 = new Float16Array(array);
            assert(_rec35._expr(_rec35._capt(_rec35._capt(_rec35._capt(float16_1, 'arguments/0/left/object').BYTES_PER_ELEMENT, 'arguments/0/left') === 2, 'arguments/0'), {
                content: 'assert(float16_1.BYTES_PER_ELEMENT === 2)',
                filepath: 'test/Float16Array.js',
                line: 297
            }));
            assert(_rec36._expr(_rec36._capt(_rec36._capt(_rec36._capt(float16_1, 'arguments/0/left/object').byteOffset, 'arguments/0/left') === 0, 'arguments/0'), {
                content: 'assert(float16_1.byteOffset === 0)',
                filepath: 'test/Float16Array.js',
                line: 298
            }));
            assert(_rec37._expr(_rec37._capt(_rec37._capt(_rec37._capt(float16_1, 'arguments/0/left/object').byteLength, 'arguments/0/left') === 8, 'arguments/0'), {
                content: 'assert(float16_1.byteLength === 8)',
                filepath: 'test/Float16Array.js',
                line: 299
            }));
            assert(_rec38._expr(_rec38._capt(_rec38._capt(_rec38._capt(float16_1, 'arguments/0/left/object').length, 'arguments/0/left') === 4, 'arguments/0'), {
                content: 'assert(float16_1.length === 4)',
                filepath: 'test/Float16Array.js',
                line: 300
            }));
            assert.equalFloat16ArrayValues(float16_1, checkArray);
            class BarArray extends Array {
                *[Symbol.iterator]() {
                    for (let i = 0, l = this.length; i < l; ++i) {
                        yield this[i];
                    }
                }
            }
            const array2 = BarArray.from([
                1,
                1.1,
                1.2,
                1.3
            ]);
            const float16_2 = new Float16Array(array2);
            assert(_rec39._expr(_rec39._capt(_rec39._capt(_rec39._capt(float16_2, 'arguments/0/left/object').BYTES_PER_ELEMENT, 'arguments/0/left') === 2, 'arguments/0'), {
                content: 'assert(float16_2.BYTES_PER_ELEMENT === 2)',
                filepath: 'test/Float16Array.js',
                line: 314
            }));
            assert(_rec40._expr(_rec40._capt(_rec40._capt(_rec40._capt(float16_2, 'arguments/0/left/object').byteOffset, 'arguments/0/left') === 0, 'arguments/0'), {
                content: 'assert(float16_2.byteOffset === 0)',
                filepath: 'test/Float16Array.js',
                line: 315
            }));
            assert(_rec41._expr(_rec41._capt(_rec41._capt(_rec41._capt(float16_2, 'arguments/0/left/object').byteLength, 'arguments/0/left') === 8, 'arguments/0'), {
                content: 'assert(float16_2.byteLength === 8)',
                filepath: 'test/Float16Array.js',
                line: 316
            }));
            assert(_rec42._expr(_rec42._capt(_rec42._capt(_rec42._capt(float16_2, 'arguments/0/left/object').length, 'arguments/0/left') === 4, 'arguments/0'), {
                content: 'assert(float16_2.length === 4)',
                filepath: 'test/Float16Array.js',
                line: 317
            }));
            assert.equalFloat16ArrayValues(float16_2, checkArray);
        });
        it('input TypedArray with custom ArrayBuffer', () => {
            var _rec43 = new _PowerAssertRecorder1();
            var _rec44 = new _PowerAssertRecorder1();
            var _rec45 = new _PowerAssertRecorder1();
            var _rec46 = new _PowerAssertRecorder1();
            var _rec47 = new _PowerAssertRecorder1();
            var _rec48 = new _PowerAssertRecorder1();
            class FooArrayBuffer extends ArrayBuffer {
            }
            const buffer = new FooArrayBuffer(16);
            const float16 = new Float16Array(new Float32Array(buffer));
            assert(_rec43._expr(_rec43._capt(_rec43._capt(_rec43._capt(float16, 'arguments/0/left/object').BYTES_PER_ELEMENT, 'arguments/0/left') === 2, 'arguments/0'), {
                content: 'assert(float16.BYTES_PER_ELEMENT === 2)',
                filepath: 'test/Float16Array.js',
                line: 327
            }));
            assert(_rec44._expr(_rec44._capt(_rec44._capt(_rec44._capt(float16, 'arguments/0/left/object').byteOffset, 'arguments/0/left') === 0, 'arguments/0'), {
                content: 'assert(float16.byteOffset === 0)',
                filepath: 'test/Float16Array.js',
                line: 328
            }));
            assert(_rec45._expr(_rec45._capt(_rec45._capt(_rec45._capt(float16, 'arguments/0/left/object').byteLength, 'arguments/0/left') === 8, 'arguments/0'), {
                content: 'assert(float16.byteLength === 8)',
                filepath: 'test/Float16Array.js',
                line: 329
            }));
            assert(_rec46._expr(_rec46._capt(_rec46._capt(_rec46._capt(float16, 'arguments/0/left/object').length, 'arguments/0/left') === 4, 'arguments/0'), {
                content: 'assert(float16.length === 4)',
                filepath: 'test/Float16Array.js',
                line: 330
            }));
            assert(_rec47._expr(_rec47._capt(_rec47._capt(_rec47._capt(float16, 'arguments/0/left/object').buffer, 'arguments/0/left') instanceof _rec47._capt(FooArrayBuffer, 'arguments/0/right'), 'arguments/0'), {
                content: 'assert(float16.buffer instanceof FooArrayBuffer)',
                filepath: 'test/Float16Array.js',
                line: 331
            }));
            assert(_rec48._expr(_rec48._capt(_rec48._capt(_rec48._capt(float16, 'arguments/0/left/object').buffer, 'arguments/0/left') !== _rec48._capt(buffer, 'arguments/0/right'), 'arguments/0'), {
                content: 'assert(float16.buffer !== buffer)',
                filepath: 'test/Float16Array.js',
                line: 332
            }));
        });
        it('input TypedArray with custom SharedArrayBuffer', function () {
            var _rec49 = new _PowerAssertRecorder1();
            var _rec50 = new _PowerAssertRecorder1();
            var _rec51 = new _PowerAssertRecorder1();
            var _rec52 = new _PowerAssertRecorder1();
            var _rec53 = new _PowerAssertRecorder1();
            var _rec54 = new _PowerAssertRecorder1();
            if (typeof SharedArrayBuffer === 'undefined') {
                this.skip();
            }
            class FooSharedArrayBuffer extends SharedArrayBuffer {
            }
            const buffer = new FooSharedArrayBuffer(16);
            const float16 = new Float16Array(new Float32Array(buffer));
            assert(_rec49._expr(_rec49._capt(_rec49._capt(_rec49._capt(float16, 'arguments/0/left/object').BYTES_PER_ELEMENT, 'arguments/0/left') === 2, 'arguments/0'), {
                content: 'assert(float16.BYTES_PER_ELEMENT === 2)',
                filepath: 'test/Float16Array.js',
                line: 345
            }));
            assert(_rec50._expr(_rec50._capt(_rec50._capt(_rec50._capt(float16, 'arguments/0/left/object').byteOffset, 'arguments/0/left') === 0, 'arguments/0'), {
                content: 'assert(float16.byteOffset === 0)',
                filepath: 'test/Float16Array.js',
                line: 346
            }));
            assert(_rec51._expr(_rec51._capt(_rec51._capt(_rec51._capt(float16, 'arguments/0/left/object').byteLength, 'arguments/0/left') === 8, 'arguments/0'), {
                content: 'assert(float16.byteLength === 8)',
                filepath: 'test/Float16Array.js',
                line: 347
            }));
            assert(_rec52._expr(_rec52._capt(_rec52._capt(_rec52._capt(float16, 'arguments/0/left/object').length, 'arguments/0/left') === 4, 'arguments/0'), {
                content: 'assert(float16.length === 4)',
                filepath: 'test/Float16Array.js',
                line: 348
            }));
            assert(_rec53._expr(_rec53._capt(!_rec53._capt(_rec53._capt(_rec53._capt(float16, 'arguments/0/argument/left/object').buffer, 'arguments/0/argument/left') instanceof _rec53._capt(FooSharedArrayBuffer, 'arguments/0/argument/right'), 'arguments/0/argument'), 'arguments/0'), {
                content: 'assert(!(float16.buffer instanceof FooSharedArrayBuffer))',
                filepath: 'test/Float16Array.js',
                line: 349
            }));
            assert(_rec54._expr(_rec54._capt(_rec54._capt(_rec54._capt(float16, 'arguments/0/left/object').buffer, 'arguments/0/left') !== _rec54._capt(buffer, 'arguments/0/right'), 'arguments/0'), {
                content: 'assert(float16.buffer !== buffer)',
                filepath: 'test/Float16Array.js',
                line: 350
            }));
        });
        it('input TypedArray with detached ArrayBuffer', function () {
            if (detach === undefined) {
                this.skip();
            }
            const float32 = new Float32Array(4);
            detach(float32.buffer);
            assert.throws(() => new Float16Array(float32), TypeError);
        });
        it('input Iterable', () => {
            var _rec55 = new _PowerAssertRecorder1();
            var _rec56 = new _PowerAssertRecorder1();
            var _rec57 = new _PowerAssertRecorder1();
            var _rec58 = new _PowerAssertRecorder1();
            const iterable = [
                1,
                1.1,
                1.2,
                1.3
            ][Symbol.iterator]();
            const checkArray = [
                1,
                1.099609375,
                1.19921875,
                1.2998046875
            ];
            const float16 = new Float16Array(iterable);
            assert(_rec55._expr(_rec55._capt(_rec55._capt(_rec55._capt(float16, 'arguments/0/left/object').BYTES_PER_ELEMENT, 'arguments/0/left') === 2, 'arguments/0'), {
                content: 'assert(float16.BYTES_PER_ELEMENT === 2)',
                filepath: 'test/Float16Array.js',
                line: 370
            }));
            assert(_rec56._expr(_rec56._capt(_rec56._capt(_rec56._capt(float16, 'arguments/0/left/object').byteOffset, 'arguments/0/left') === 0, 'arguments/0'), {
                content: 'assert(float16.byteOffset === 0)',
                filepath: 'test/Float16Array.js',
                line: 371
            }));
            assert(_rec57._expr(_rec57._capt(_rec57._capt(_rec57._capt(float16, 'arguments/0/left/object').byteLength, 'arguments/0/left') === 8, 'arguments/0'), {
                content: 'assert(float16.byteLength === 8)',
                filepath: 'test/Float16Array.js',
                line: 372
            }));
            assert(_rec58._expr(_rec58._capt(_rec58._capt(_rec58._capt(float16, 'arguments/0/left/object').length, 'arguments/0/left') === 4, 'arguments/0'), {
                content: 'assert(float16.length === 4)',
                filepath: 'test/Float16Array.js',
                line: 373
            }));
            assert.equalFloat16ArrayValues(float16, checkArray);
        });
        it('input ArrayLike', () => {
            var _rec59 = new _PowerAssertRecorder1();
            var _rec60 = new _PowerAssertRecorder1();
            var _rec61 = new _PowerAssertRecorder1();
            var _rec62 = new _PowerAssertRecorder1();
            const arrayLike = {
                '0': 1,
                '1': 1.1,
                '2': 1.2,
                '3': 1.3,
                length: 4
            };
            const checkArray = [
                1,
                1.099609375,
                1.19921875,
                1.2998046875
            ];
            const float16 = new Float16Array(arrayLike);
            assert(_rec59._expr(_rec59._capt(_rec59._capt(_rec59._capt(float16, 'arguments/0/left/object').BYTES_PER_ELEMENT, 'arguments/0/left') === 2, 'arguments/0'), {
                content: 'assert(float16.BYTES_PER_ELEMENT === 2)',
                filepath: 'test/Float16Array.js',
                line: 383
            }));
            assert(_rec60._expr(_rec60._capt(_rec60._capt(_rec60._capt(float16, 'arguments/0/left/object').byteOffset, 'arguments/0/left') === 0, 'arguments/0'), {
                content: 'assert(float16.byteOffset === 0)',
                filepath: 'test/Float16Array.js',
                line: 384
            }));
            assert(_rec61._expr(_rec61._capt(_rec61._capt(_rec61._capt(float16, 'arguments/0/left/object').byteLength, 'arguments/0/left') === 8, 'arguments/0'), {
                content: 'assert(float16.byteLength === 8)',
                filepath: 'test/Float16Array.js',
                line: 385
            }));
            assert(_rec62._expr(_rec62._capt(_rec62._capt(_rec62._capt(float16, 'arguments/0/left/object').length, 'arguments/0/left') === 4, 'arguments/0'), {
                content: 'assert(float16.length === 4)',
                filepath: 'test/Float16Array.js',
                line: 386
            }));
            assert.equalFloat16ArrayValues(float16, checkArray);
        });
        it('input Float16Array', () => {
            var _rec63 = new _PowerAssertRecorder1();
            var _rec64 = new _PowerAssertRecorder1();
            var _rec65 = new _PowerAssertRecorder1();
            var _rec66 = new _PowerAssertRecorder1();
            var _rec67 = new _PowerAssertRecorder1();
            var _rec68 = new _PowerAssertRecorder1();
            var _rec69 = new _PowerAssertRecorder1();
            var _rec70 = new _PowerAssertRecorder1();
            var _rec71 = new _PowerAssertRecorder1();
            const array = [
                1,
                1.1,
                1.2,
                1.3
            ];
            const checkArray = [
                1,
                1.099609375,
                1.19921875,
                1.2998046875
            ];
            const float16_1 = new Float16Array(new Float16Array(array));
            assert(_rec63._expr(_rec63._capt(_rec63._capt(_rec63._capt(float16_1, 'arguments/0/left/object').BYTES_PER_ELEMENT, 'arguments/0/left') === 2, 'arguments/0'), {
                content: 'assert(float16_1.BYTES_PER_ELEMENT === 2)',
                filepath: 'test/Float16Array.js',
                line: 396
            }));
            assert(_rec64._expr(_rec64._capt(_rec64._capt(_rec64._capt(float16_1, 'arguments/0/left/object').byteOffset, 'arguments/0/left') === 0, 'arguments/0'), {
                content: 'assert(float16_1.byteOffset === 0)',
                filepath: 'test/Float16Array.js',
                line: 397
            }));
            assert(_rec65._expr(_rec65._capt(_rec65._capt(_rec65._capt(float16_1, 'arguments/0/left/object').byteLength, 'arguments/0/left') === 8, 'arguments/0'), {
                content: 'assert(float16_1.byteLength === 8)',
                filepath: 'test/Float16Array.js',
                line: 398
            }));
            assert(_rec66._expr(_rec66._capt(_rec66._capt(_rec66._capt(float16_1, 'arguments/0/left/object').length, 'arguments/0/left') === 4, 'arguments/0'), {
                content: 'assert(float16_1.length === 4)',
                filepath: 'test/Float16Array.js',
                line: 399
            }));
            assert.equalFloat16ArrayValues(float16_1, checkArray);
            class FooArrayBuffer extends ArrayBuffer {
            }
            const buffer = new FooArrayBuffer(16);
            const float16_2 = new Float16Array(new Float16Array(buffer));
            assert(_rec67._expr(_rec67._capt(_rec67._capt(_rec67._capt(float16_2, 'arguments/0/left/object').BYTES_PER_ELEMENT, 'arguments/0/left') === 2, 'arguments/0'), {
                content: 'assert(float16_2.BYTES_PER_ELEMENT === 2)',
                filepath: 'test/Float16Array.js',
                line: 407
            }));
            assert(_rec68._expr(_rec68._capt(_rec68._capt(_rec68._capt(float16_2, 'arguments/0/left/object').byteOffset, 'arguments/0/left') === 0, 'arguments/0'), {
                content: 'assert(float16_2.byteOffset === 0)',
                filepath: 'test/Float16Array.js',
                line: 408
            }));
            assert(_rec69._expr(_rec69._capt(_rec69._capt(_rec69._capt(float16_2, 'arguments/0/left/object').byteLength, 'arguments/0/left') === 16, 'arguments/0'), {
                content: 'assert(float16_2.byteLength === 16)',
                filepath: 'test/Float16Array.js',
                line: 409
            }));
            assert(_rec70._expr(_rec70._capt(_rec70._capt(_rec70._capt(float16_2, 'arguments/0/left/object').length, 'arguments/0/left') === 8, 'arguments/0'), {
                content: 'assert(float16_2.length === 8)',
                filepath: 'test/Float16Array.js',
                line: 410
            }));
            assert(_rec71._expr(_rec71._capt(_rec71._capt(_rec71._capt(float16_2, 'arguments/0/left/object').buffer, 'arguments/0/left') !== _rec71._capt(buffer, 'arguments/0/right'), 'arguments/0'), {
                content: 'assert(float16_2.buffer !== buffer)',
                filepath: 'test/Float16Array.js',
                line: 413
            }));
        });
        it('input Float16Array with detached ArrayBuffer', function () {
            if (detach === undefined) {
                this.skip();
            }
            const float16 = new Float16Array(4);
            detach(float16.buffer);
            assert.throws(() => new Float16Array(float16), TypeError);
        });
        it('input Float16Array from another realm', function () {
            var _rec72 = new _PowerAssertRecorder1();
            var _rec73 = new _PowerAssertRecorder1();
            var _rec74 = new _PowerAssertRecorder1();
            var _rec75 = new _PowerAssertRecorder1();
            var _rec76 = new _PowerAssertRecorder1();
            var _rec77 = new _PowerAssertRecorder1();
            var _rec78 = new _PowerAssertRecorder1();
            var _rec79 = new _PowerAssertRecorder1();
            var _rec80 = new _PowerAssertRecorder1();
            if (AnotherRealmFloat16Array === undefined) {
                this.skip();
            }
            const array = [
                1,
                1.1,
                1.2,
                1.3
            ];
            const checkArray = [
                1,
                1.099609375,
                1.19921875,
                1.2998046875
            ];
            const float16_1 = new Float16Array(new AnotherRealmFloat16Array(array));
            assert(_rec72._expr(_rec72._capt(_rec72._capt(_rec72._capt(float16_1, 'arguments/0/left/object').BYTES_PER_ELEMENT, 'arguments/0/left') === 2, 'arguments/0'), {
                content: 'assert(float16_1.BYTES_PER_ELEMENT === 2)',
                filepath: 'test/Float16Array.js',
                line: 437
            }));
            assert(_rec73._expr(_rec73._capt(_rec73._capt(_rec73._capt(float16_1, 'arguments/0/left/object').byteOffset, 'arguments/0/left') === 0, 'arguments/0'), {
                content: 'assert(float16_1.byteOffset === 0)',
                filepath: 'test/Float16Array.js',
                line: 438
            }));
            assert(_rec74._expr(_rec74._capt(_rec74._capt(_rec74._capt(float16_1, 'arguments/0/left/object').byteLength, 'arguments/0/left') === 8, 'arguments/0'), {
                content: 'assert(float16_1.byteLength === 8)',
                filepath: 'test/Float16Array.js',
                line: 439
            }));
            assert(_rec75._expr(_rec75._capt(_rec75._capt(_rec75._capt(float16_1, 'arguments/0/left/object').length, 'arguments/0/left') === 4, 'arguments/0'), {
                content: 'assert(float16_1.length === 4)',
                filepath: 'test/Float16Array.js',
                line: 440
            }));
            assert.equalFloat16ArrayValues(float16_1, checkArray);
            class FooArrayBuffer extends ArrayBuffer {
            }
            const buffer = new FooArrayBuffer(16);
            const float16_2 = new Float16Array(new AnotherRealmFloat16Array(buffer));
            assert(_rec76._expr(_rec76._capt(_rec76._capt(_rec76._capt(float16_2, 'arguments/0/left/object').BYTES_PER_ELEMENT, 'arguments/0/left') === 2, 'arguments/0'), {
                content: 'assert(float16_2.BYTES_PER_ELEMENT === 2)',
                filepath: 'test/Float16Array.js',
                line: 448
            }));
            assert(_rec77._expr(_rec77._capt(_rec77._capt(_rec77._capt(float16_2, 'arguments/0/left/object').byteOffset, 'arguments/0/left') === 0, 'arguments/0'), {
                content: 'assert(float16_2.byteOffset === 0)',
                filepath: 'test/Float16Array.js',
                line: 449
            }));
            assert(_rec78._expr(_rec78._capt(_rec78._capt(_rec78._capt(float16_2, 'arguments/0/left/object').byteLength, 'arguments/0/left') === 16, 'arguments/0'), {
                content: 'assert(float16_2.byteLength === 16)',
                filepath: 'test/Float16Array.js',
                line: 450
            }));
            assert(_rec79._expr(_rec79._capt(_rec79._capt(_rec79._capt(float16_2, 'arguments/0/left/object').length, 'arguments/0/left') === 8, 'arguments/0'), {
                content: 'assert(float16_2.length === 8)',
                filepath: 'test/Float16Array.js',
                line: 451
            }));
            assert(_rec80._expr(_rec80._capt(_rec80._capt(_rec80._capt(float16_2, 'arguments/0/left/object').buffer, 'arguments/0/left') !== _rec80._capt(buffer, 'arguments/0/right'), 'arguments/0'), {
                content: 'assert(float16_2.buffer !== buffer)',
                filepath: 'test/Float16Array.js',
                line: 454
            }));
        });
        it('input ArrayBuffer', () => {
            var _rec81 = new _PowerAssertRecorder1();
            var _rec82 = new _PowerAssertRecorder1();
            var _rec83 = new _PowerAssertRecorder1();
            var _rec84 = new _PowerAssertRecorder1();
            var _rec85 = new _PowerAssertRecorder1();
            var _rec86 = new _PowerAssertRecorder1();
            var _rec87 = new _PowerAssertRecorder1();
            var _rec88 = new _PowerAssertRecorder1();
            var _rec89 = new _PowerAssertRecorder1();
            var _rec90 = new _PowerAssertRecorder1();
            const buffer = new Uint16Array([
                15360,
                15462,
                15564,
                15667
            ]).buffer;
            const float16_1 = new Float16Array(buffer);
            assert(_rec81._expr(_rec81._capt(_rec81._capt(_rec81._capt(float16_1, 'arguments/0/left/object').BYTES_PER_ELEMENT, 'arguments/0/left') === 2, 'arguments/0'), {
                content: 'assert(float16_1.BYTES_PER_ELEMENT === 2)',
                filepath: 'test/Float16Array.js',
                line: 462
            }));
            assert(_rec82._expr(_rec82._capt(_rec82._capt(_rec82._capt(float16_1, 'arguments/0/left/object').buffer, 'arguments/0/left') === _rec82._capt(buffer, 'arguments/0/right'), 'arguments/0'), {
                content: 'assert(float16_1.buffer === buffer)',
                filepath: 'test/Float16Array.js',
                line: 463
            }));
            assert(_rec83._expr(_rec83._capt(_rec83._capt(_rec83._capt(float16_1, 'arguments/0/left/object').byteOffset, 'arguments/0/left') === 0, 'arguments/0'), {
                content: 'assert(float16_1.byteOffset === 0)',
                filepath: 'test/Float16Array.js',
                line: 464
            }));
            assert(_rec84._expr(_rec84._capt(_rec84._capt(_rec84._capt(float16_1, 'arguments/0/left/object').byteLength, 'arguments/0/left') === 8, 'arguments/0'), {
                content: 'assert(float16_1.byteLength === 8)',
                filepath: 'test/Float16Array.js',
                line: 465
            }));
            assert(_rec85._expr(_rec85._capt(_rec85._capt(_rec85._capt(float16_1, 'arguments/0/left/object').length, 'arguments/0/left') === 4, 'arguments/0'), {
                content: 'assert(float16_1.length === 4)',
                filepath: 'test/Float16Array.js',
                line: 466
            }));
            assert.equalFloat16ArrayValues(float16_1, [
                1,
                1.099609375,
                1.19921875,
                1.2998046875
            ]);
            const float16_2 = new Float16Array(buffer, 2, 2);
            assert(_rec86._expr(_rec86._capt(_rec86._capt(_rec86._capt(float16_2, 'arguments/0/left/object').BYTES_PER_ELEMENT, 'arguments/0/left') === 2, 'arguments/0'), {
                content: 'assert(float16_2.BYTES_PER_ELEMENT === 2)',
                filepath: 'test/Float16Array.js',
                line: 476
            }));
            assert(_rec87._expr(_rec87._capt(_rec87._capt(_rec87._capt(float16_2, 'arguments/0/left/object').buffer, 'arguments/0/left') === _rec87._capt(buffer, 'arguments/0/right'), 'arguments/0'), {
                content: 'assert(float16_2.buffer === buffer)',
                filepath: 'test/Float16Array.js',
                line: 477
            }));
            assert(_rec88._expr(_rec88._capt(_rec88._capt(_rec88._capt(float16_2, 'arguments/0/left/object').byteOffset, 'arguments/0/left') === 2, 'arguments/0'), {
                content: 'assert(float16_2.byteOffset === 2)',
                filepath: 'test/Float16Array.js',
                line: 478
            }));
            assert(_rec89._expr(_rec89._capt(_rec89._capt(_rec89._capt(float16_2, 'arguments/0/left/object').byteLength, 'arguments/0/left') === 4, 'arguments/0'), {
                content: 'assert(float16_2.byteLength === 4)',
                filepath: 'test/Float16Array.js',
                line: 479
            }));
            assert(_rec90._expr(_rec90._capt(_rec90._capt(_rec90._capt(float16_2, 'arguments/0/left/object').length, 'arguments/0/left') === 2, 'arguments/0'), {
                content: 'assert(float16_2.length === 2)',
                filepath: 'test/Float16Array.js',
                line: 480
            }));
            assert.equalFloat16ArrayValues(float16_2, [
                1.099609375,
                1.19921875
            ]);
        });
        it('input detached ArrayBuffer', function () {
            if (detach === undefined) {
                this.skip();
            }
            const detachedBuffer = detach(new ArrayBuffer(4));
            assert.throws(() => new Float16Array(detachedBuffer), TypeError);
        });
    });
    describe('.from()', () => {
        it('property `name` is \'from\'', () => {
            var _rec91 = new _PowerAssertRecorder1();
            assert(_rec91._expr(_rec91._capt(_rec91._capt(_rec91._capt(_rec91._capt(Float16Array, 'arguments/0/left/object/object').from, 'arguments/0/left/object').name, 'arguments/0/left') === 'from', 'arguments/0'), {
                content: 'assert(Float16Array.from.name === "from")',
                filepath: 'test/Float16Array.js',
                line: 496
            }));
        });
        it('property `length` is 1', () => {
            var _rec92 = new _PowerAssertRecorder1();
            assert(_rec92._expr(_rec92._capt(_rec92._capt(_rec92._capt(_rec92._capt(Float16Array, 'arguments/0/left/object/object').from, 'arguments/0/left/object').length, 'arguments/0/left') === 1, 'arguments/0'), {
                content: 'assert(Float16Array.from.length === 1)',
                filepath: 'test/Float16Array.js',
                line: 500
            }));
        });
        it('input empty or primitive', () => {
            assert.doesNotThrow(() => Float16Array.from(0));
            assert.doesNotThrow(() => Float16Array.from(4));
            assert.doesNotThrow(() => Float16Array.from(-1));
            assert.doesNotThrow(() => Float16Array.from(Symbol()));
            assert.throws(() => Float16Array.from(), TypeError);
            assert.throws(() => Float16Array.from(null), TypeError);
            assert.throws(() => Float16Array.from(undefined), TypeError);
        });
        it('input Array or TypedArray', () => {
            var _rec93 = new _PowerAssertRecorder1();
            var _rec94 = new _PowerAssertRecorder1();
            const array = [
                1,
                1.1,
                1.2,
                1.3
            ];
            const checkArray = [
                1,
                1.099609375,
                1.19921875,
                1.2998046875
            ];
            const float16_1 = Float16Array.from(array);
            assert(_rec93._expr(_rec93._capt(_rec93._capt(float16_1, 'arguments/0/left') instanceof _rec93._capt(Float16Array, 'arguments/0/right'), 'arguments/0'), {
                content: 'assert(float16_1 instanceof Float16Array)',
                filepath: 'test/Float16Array.js',
                line: 520
            }));
            assert.equalFloat16ArrayValues(float16_1, checkArray);
            const float16_2 = Float16Array.from(new Float32Array(array));
            assert(_rec94._expr(_rec94._capt(_rec94._capt(float16_2, 'arguments/0/left') instanceof _rec94._capt(Float16Array, 'arguments/0/right'), 'arguments/0'), {
                content: 'assert(float16_2 instanceof Float16Array)',
                filepath: 'test/Float16Array.js',
                line: 525
            }));
            assert.equalFloat16ArrayValues(float16_2, checkArray);
        });
        it('input Iterable', () => {
            var _rec95 = new _PowerAssertRecorder1();
            const iterable = [
                1,
                1.1,
                1.2,
                1.3
            ][Symbol.iterator]();
            const checkArray = [
                1,
                1.099609375,
                1.19921875,
                1.2998046875
            ];
            const float16 = Float16Array.from(iterable);
            assert(_rec95._expr(_rec95._capt(_rec95._capt(float16, 'arguments/0/left') instanceof _rec95._capt(Float16Array, 'arguments/0/right'), 'arguments/0'), {
                content: 'assert(float16 instanceof Float16Array)',
                filepath: 'test/Float16Array.js',
                line: 535
            }));
            assert.equalFloat16ArrayValues(float16, checkArray);
        });
        it('input ArrayLike', () => {
            var _rec96 = new _PowerAssertRecorder1();
            const arrayLike = {
                0: 1,
                1: 1.1,
                2: 1.2,
                3: 1.3,
                length: 4
            };
            const checkArray = [
                1,
                1.099609375,
                1.19921875,
                1.2998046875
            ];
            const float16 = Float16Array.from(arrayLike);
            assert(_rec96._expr(_rec96._capt(_rec96._capt(float16, 'arguments/0/left') instanceof _rec96._capt(Float16Array, 'arguments/0/right'), 'arguments/0'), {
                content: 'assert(float16 instanceof Float16Array)',
                filepath: 'test/Float16Array.js',
                line: 545
            }));
            assert.equalFloat16ArrayValues(float16, checkArray);
        });
        it('input Float16Array', () => {
            var _rec97 = new _PowerAssertRecorder1();
            const array = [
                1,
                1.1,
                1.2,
                1.3
            ];
            const checkArray = [
                1,
                1.099609375,
                1.19921875,
                1.2998046875
            ];
            const float16 = Float16Array.from(new Float16Array(array));
            assert(_rec97._expr(_rec97._capt(_rec97._capt(float16, 'arguments/0/left') instanceof _rec97._capt(Float16Array, 'arguments/0/right'), 'arguments/0'), {
                content: 'assert(float16 instanceof Float16Array)',
                filepath: 'test/Float16Array.js',
                line: 555
            }));
            assert.equalFloat16ArrayValues(float16, checkArray);
        });
        it('input Float16Array from another realm', function () {
            var _rec98 = new _PowerAssertRecorder1();
            if (AnotherRealmFloat16Array === undefined) {
                this.skip();
            }
            const array = [
                1,
                1.1,
                1.2,
                1.3
            ];
            const checkArray = [
                1,
                1.099609375,
                1.19921875,
                1.2998046875
            ];
            const float16 = Float16Array.from(new AnotherRealmFloat16Array(array));
            assert(_rec98._expr(_rec98._capt(_rec98._capt(float16, 'arguments/0/left') instanceof _rec98._capt(Float16Array, 'arguments/0/right'), 'arguments/0'), {
                content: 'assert(float16 instanceof Float16Array)',
                filepath: 'test/Float16Array.js',
                line: 569
            }));
            assert.equalFloat16ArrayValues(float16, checkArray);
        });
        it('call from subclass', () => {
            var _rec99 = new _PowerAssertRecorder1();
            var _rec100 = new _PowerAssertRecorder1();
            var _rec101 = new _PowerAssertRecorder1();
            class Foo extends Float16Array {
            }
            const checkArray = [
                1,
                1.099609375,
                1.19921875,
                1.2998046875
            ];
            const array = [
                1,
                1.1,
                1.2,
                1.3
            ];
            const foo1 = Foo.from(array);
            assert(_rec99._expr(_rec99._capt(_rec99._capt(foo1, 'arguments/0/left') instanceof _rec99._capt(Foo, 'arguments/0/right'), 'arguments/0'), {
                content: 'assert(foo1 instanceof Foo)',
                filepath: 'test/Float16Array.js',
                line: 581
            }));
            assert.equalFloat16ArrayValues(foo1, checkArray);
            const iterable = [
                1,
                1.1,
                1.2,
                1.3
            ][Symbol.iterator]();
            const foo2 = Foo.from(iterable);
            assert(_rec100._expr(_rec100._capt(_rec100._capt(foo2, 'arguments/0/left') instanceof _rec100._capt(Foo, 'arguments/0/right'), 'arguments/0'), {
                content: 'assert(foo2 instanceof Foo)',
                filepath: 'test/Float16Array.js',
                line: 587
            }));
            assert.equalFloat16ArrayValues(foo2, checkArray);
            const arrayLike = {
                0: 1,
                1: 1.1,
                2: 1.2,
                3: 1.3,
                length: 4
            };
            const foo3 = Foo.from(arrayLike);
            assert(_rec101._expr(_rec101._capt(_rec101._capt(foo3, 'arguments/0/left') instanceof _rec101._capt(Foo, 'arguments/0/right'), 'arguments/0'), {
                content: 'assert(foo3 instanceof Foo)',
                filepath: 'test/Float16Array.js',
                line: 593
            }));
            assert.equalFloat16ArrayValues(foo3, checkArray);
        });
        it('check mapFn callback arguments', () => {
            var _rec106 = new _PowerAssertRecorder1();
            var _rec111 = new _PowerAssertRecorder1();
            const thisArg = {};
            const checkArray = [2];
            const float16 = Float16Array.from([1], function (val, key) {
                var _rec102 = new _PowerAssertRecorder1();
                var _rec103 = new _PowerAssertRecorder1();
                var _rec104 = new _PowerAssertRecorder1();
                var _rec105 = new _PowerAssertRecorder1();
                assert(_rec102._expr(_rec102._capt(_rec102._capt(val, 'arguments/0/left') === 1, 'arguments/0'), {
                    content: 'assert(val === 1)',
                    filepath: 'test/Float16Array.js',
                    line: 602
                }));
                assert(_rec103._expr(_rec103._capt(_rec103._capt(key, 'arguments/0/left') === 0, 'arguments/0'), {
                    content: 'assert(key === 0)',
                    filepath: 'test/Float16Array.js',
                    line: 603
                }));
                assert(_rec104._expr(_rec104._capt(this === _rec104._capt(thisArg, 'arguments/0/right'), 'arguments/0'), {
                    content: 'assert(this === thisArg)',
                    filepath: 'test/Float16Array.js',
                    line: 604
                }));
                assert(_rec105._expr(_rec105._capt(_rec105._capt(_rec105._capt(arguments, 'arguments/0/left/object').length, 'arguments/0/left') === 2, 'arguments/0'), {
                    content: 'assert(arguments.length === 2)',
                    filepath: 'test/Float16Array.js',
                    line: 605
                }));
                return 2;
            }, thisArg);
            assert(_rec106._expr(_rec106._capt(_rec106._capt(float16, 'arguments/0/left') instanceof _rec106._capt(Float16Array, 'arguments/0/right'), 'arguments/0'), {
                content: 'assert(float16 instanceof Float16Array)',
                filepath: 'test/Float16Array.js',
                line: 610
            }));
            assert.equalFloat16ArrayValues(float16, checkArray);
            class Foo extends Float16Array {
            }
            const foo = Foo.from([1], function (val, key) {
                var _rec107 = new _PowerAssertRecorder1();
                var _rec108 = new _PowerAssertRecorder1();
                var _rec109 = new _PowerAssertRecorder1();
                var _rec110 = new _PowerAssertRecorder1();
                assert(_rec107._expr(_rec107._capt(_rec107._capt(val, 'arguments/0/left') === 1, 'arguments/0'), {
                    content: 'assert(val === 1)',
                    filepath: 'test/Float16Array.js',
                    line: 616
                }));
                assert(_rec108._expr(_rec108._capt(_rec108._capt(key, 'arguments/0/left') === 0, 'arguments/0'), {
                    content: 'assert(key === 0)',
                    filepath: 'test/Float16Array.js',
                    line: 617
                }));
                assert(_rec109._expr(_rec109._capt(this === _rec109._capt(thisArg, 'arguments/0/right'), 'arguments/0'), {
                    content: 'assert(this === thisArg)',
                    filepath: 'test/Float16Array.js',
                    line: 618
                }));
                assert(_rec110._expr(_rec110._capt(_rec110._capt(_rec110._capt(arguments, 'arguments/0/left/object').length, 'arguments/0/left') === 2, 'arguments/0'), {
                    content: 'assert(arguments.length === 2)',
                    filepath: 'test/Float16Array.js',
                    line: 619
                }));
                return 2;
            }, thisArg);
            assert(_rec111._expr(_rec111._capt(_rec111._capt(foo, 'arguments/0/left') instanceof _rec111._capt(Foo, 'arguments/0/right'), 'arguments/0'), {
                content: 'assert(foo instanceof Foo)',
                filepath: 'test/Float16Array.js',
                line: 624
            }));
            assert.equalFloat16ArrayValues(foo, checkArray);
        });
    });
    describe('.of()', () => {
        it('property `name` is \'of\'', () => {
            var _rec112 = new _PowerAssertRecorder1();
            assert(_rec112._expr(_rec112._capt(_rec112._capt(_rec112._capt(_rec112._capt(Float16Array, 'arguments/0/left/object/object').of, 'arguments/0/left/object').name, 'arguments/0/left') === 'of', 'arguments/0'), {
                content: 'assert(Float16Array.of.name === "of")',
                filepath: 'test/Float16Array.js',
                line: 631
            }));
        });
        it('property `length` is 0', () => {
            var _rec113 = new _PowerAssertRecorder1();
            assert(_rec113._expr(_rec113._capt(_rec113._capt(_rec113._capt(_rec113._capt(Float16Array, 'arguments/0/left/object/object').of, 'arguments/0/left/object').length, 'arguments/0/left') === 0, 'arguments/0'), {
                content: 'assert(Float16Array.of.length === 0)',
                filepath: 'test/Float16Array.js',
                line: 635
            }));
        });
        it('input', () => {
            var _rec114 = new _PowerAssertRecorder1();
            const array = [
                1,
                1.1,
                1.2,
                1.3
            ];
            const checkArray = [
                1,
                1.099609375,
                1.19921875,
                1.2998046875
            ];
            const float16 = Float16Array.of(...array);
            assert(_rec114._expr(_rec114._capt(_rec114._capt(float16, 'arguments/0/left') instanceof _rec114._capt(Float16Array, 'arguments/0/right'), 'arguments/0'), {
                content: 'assert(float16 instanceof Float16Array)',
                filepath: 'test/Float16Array.js',
                line: 644
            }));
            assert.equalFloat16ArrayValues(float16, checkArray);
        });
        it('call from subclass', () => {
            var _rec115 = new _PowerAssertRecorder1();
            class Foo extends Float16Array {
            }
            const array = [
                1,
                1.1,
                1.2,
                1.3
            ];
            const checkArray = [
                1,
                1.099609375,
                1.19921875,
                1.2998046875
            ];
            const foo = Foo.of(...array);
            assert(_rec115._expr(_rec115._capt(_rec115._capt(foo, 'arguments/0/left') instanceof _rec115._capt(Foo, 'arguments/0/right'), 'arguments/0'), {
                content: 'assert(foo instanceof Foo)',
                filepath: 'test/Float16Array.js',
                line: 656
            }));
            assert.equalFloat16ArrayValues(foo, checkArray);
        });
    });
    describe('get #[ @@toStringTag ]', () => {
        it('return \'Float16Array\' when access by instance', () => {
            var _rec116 = new _PowerAssertRecorder1();
            const float16 = new Float16Array();
            assert(_rec116._expr(_rec116._capt(_rec116._capt(_rec116._capt(float16, 'arguments/0/left/object')[_rec116._capt(_rec116._capt(Symbol, 'arguments/0/left/property/object').toStringTag, 'arguments/0/left/property')], 'arguments/0/left') === 'Float16Array', 'arguments/0'), {
                content: 'assert(float16[Symbol.toStringTag] === "Float16Array")',
                filepath: 'test/Float16Array.js',
                line: 664
            }));
        });
        it('return undefined when access by prototype', () => {
            var _rec117 = new _PowerAssertRecorder1();
            assert(_rec117._expr(_rec117._capt(_rec117._capt(_rec117._capt(_rec117._capt(Float16Array, 'arguments/0/left/object/object').prototype, 'arguments/0/left/object')[_rec117._capt(_rec117._capt(Symbol, 'arguments/0/left/property/object').toStringTag, 'arguments/0/left/property')], 'arguments/0/left') === _rec117._capt(undefined, 'arguments/0/right'), 'arguments/0'), {
                content: 'assert(Float16Array.prototype[Symbol.toStringTag] === undefined)',
                filepath: 'test/Float16Array.js',
                line: 668
            }));
        });
    });
    describe('#keys()', () => {
        it('property `name` is \'keys\'', () => {
            var _rec118 = new _PowerAssertRecorder1();
            assert(_rec118._expr(_rec118._capt(_rec118._capt(_rec118._capt(_rec118._capt(_rec118._capt(Float16Array, 'arguments/0/left/object/object/object').prototype, 'arguments/0/left/object/object').keys, 'arguments/0/left/object').name, 'arguments/0/left') === 'keys', 'arguments/0'), {
                content: 'assert(Float16Array.prototype.keys.name === "keys")',
                filepath: 'test/Float16Array.js',
                line: 674
            }));
        });
        it('property `length` is 0', () => {
            var _rec119 = new _PowerAssertRecorder1();
            assert(_rec119._expr(_rec119._capt(_rec119._capt(_rec119._capt(_rec119._capt(_rec119._capt(Float16Array, 'arguments/0/left/object/object/object').prototype, 'arguments/0/left/object/object').keys, 'arguments/0/left/object').length, 'arguments/0/left') === 0, 'arguments/0'), {
                content: 'assert(Float16Array.prototype.keys.length === 0)',
                filepath: 'test/Float16Array.js',
                line: 678
            }));
        });
        it('get keys', () => {
            var _rec120 = new _PowerAssertRecorder1();
            var _rec121 = new _PowerAssertRecorder1();
            const float16 = new Float16Array([
                1,
                2,
                3
            ]);
            const array = [...float16.keys()];
            assert.deepStrictEqual(_rec120._expr(_rec120._capt(array, 'arguments/0'), {
                content: 'assert.deepStrictEqual(array, [0,1,2])',
                filepath: 'test/Float16Array.js',
                line: 685
            }), _rec121._expr(_rec121._capt([
                0,
                1,
                2
            ], 'arguments/1'), {
                content: 'assert.deepStrictEqual(array, [0,1,2])',
                filepath: 'test/Float16Array.js',
                line: 685
            }));
        });
        it('suspend to iterate keys', () => {
            var _rec122 = new _PowerAssertRecorder1();
            var _rec123 = new _PowerAssertRecorder1();
            var _rec124 = new _PowerAssertRecorder1();
            var _rec125 = new _PowerAssertRecorder1();
            const float16 = new Float16Array([
                1,
                2,
                3
            ]);
            const iterator = float16.keys();
            for (const key of iterator) {
                if (key === 1) {
                    break;
                }
            }
            assert.deepStrictEqual(_rec122._expr(_rec122._capt(_rec122._capt(iterator, 'arguments/0/callee/object').next(), 'arguments/0'), {
                content: 'assert.deepStrictEqual(iterator.next(), {value: 2,done: false})',
                filepath: 'test/Float16Array.js',
                line: 698
            }), _rec123._expr(_rec123._capt({
                value: 2,
                done: false
            }, 'arguments/1'), {
                content: 'assert.deepStrictEqual(iterator.next(), {value: 2,done: false})',
                filepath: 'test/Float16Array.js',
                line: 698
            }));
            assert.deepStrictEqual(_rec124._expr(_rec124._capt(_rec124._capt(iterator, 'arguments/0/callee/object').next(), 'arguments/0'), {
                content: 'assert.deepStrictEqual(iterator.next(), {value: undefined,done: true})',
                filepath: 'test/Float16Array.js',
                line: 699
            }), _rec125._expr(_rec125._capt({
                value: _rec125._capt(undefined, 'arguments/1/properties/0/value'),
                done: true
            }, 'arguments/1'), {
                content: 'assert.deepStrictEqual(iterator.next(), {value: undefined,done: true})',
                filepath: 'test/Float16Array.js',
                line: 699
            }));
        });
    });
    describe('#values()', () => {
        it('property `name` is \'values\'', () => {
            var _rec126 = new _PowerAssertRecorder1();
            assert(_rec126._expr(_rec126._capt(_rec126._capt(_rec126._capt(_rec126._capt(_rec126._capt(Float16Array, 'arguments/0/left/object/object/object').prototype, 'arguments/0/left/object/object').values, 'arguments/0/left/object').name, 'arguments/0/left') === 'values', 'arguments/0'), {
                content: 'assert(Float16Array.prototype.values.name === "values")',
                filepath: 'test/Float16Array.js',
                line: 705
            }));
        });
        it('property `length` is 0', () => {
            var _rec127 = new _PowerAssertRecorder1();
            assert(_rec127._expr(_rec127._capt(_rec127._capt(_rec127._capt(_rec127._capt(_rec127._capt(Float16Array, 'arguments/0/left/object/object/object').prototype, 'arguments/0/left/object/object').values, 'arguments/0/left/object').length, 'arguments/0/left') === 0, 'arguments/0'), {
                content: 'assert(Float16Array.prototype.values.length === 0)',
                filepath: 'test/Float16Array.js',
                line: 709
            }));
        });
        it('get values', () => {
            var _rec128 = new _PowerAssertRecorder1();
            var _rec129 = new _PowerAssertRecorder1();
            const float16 = new Float16Array([
                1,
                2,
                3
            ]);
            const array = [...float16.values()];
            assert.deepStrictEqual(_rec128._expr(_rec128._capt(array, 'arguments/0'), {
                content: 'assert.deepStrictEqual(array, [1,2,3])',
                filepath: 'test/Float16Array.js',
                line: 716
            }), _rec129._expr(_rec129._capt([
                1,
                2,
                3
            ], 'arguments/1'), {
                content: 'assert.deepStrictEqual(array, [1,2,3])',
                filepath: 'test/Float16Array.js',
                line: 716
            }));
        });
        it('suspend to iterate values', () => {
            var _rec130 = new _PowerAssertRecorder1();
            var _rec131 = new _PowerAssertRecorder1();
            var _rec132 = new _PowerAssertRecorder1();
            var _rec133 = new _PowerAssertRecorder1();
            const float16 = new Float16Array([
                1,
                2,
                3
            ]);
            const iterator = float16.values();
            for (const value of iterator) {
                if (value === 2) {
                    break;
                }
            }
            assert.deepStrictEqual(_rec130._expr(_rec130._capt(_rec130._capt(iterator, 'arguments/0/callee/object').next(), 'arguments/0'), {
                content: 'assert.deepStrictEqual(iterator.next(), {value: 3,done: false})',
                filepath: 'test/Float16Array.js',
                line: 729
            }), _rec131._expr(_rec131._capt({
                value: 3,
                done: false
            }, 'arguments/1'), {
                content: 'assert.deepStrictEqual(iterator.next(), {value: 3,done: false})',
                filepath: 'test/Float16Array.js',
                line: 729
            }));
            assert.deepStrictEqual(_rec132._expr(_rec132._capt(_rec132._capt(iterator, 'arguments/0/callee/object').next(), 'arguments/0'), {
                content: 'assert.deepStrictEqual(iterator.next(), {value: undefined,done: true})',
                filepath: 'test/Float16Array.js',
                line: 730
            }), _rec133._expr(_rec133._capt({
                value: _rec133._capt(undefined, 'arguments/1/properties/0/value'),
                done: true
            }, 'arguments/1'), {
                content: 'assert.deepStrictEqual(iterator.next(), {value: undefined,done: true})',
                filepath: 'test/Float16Array.js',
                line: 730
            }));
        });
    });
    describe('#entries()', () => {
        it('property `name` is \'entries\'', () => {
            var _rec134 = new _PowerAssertRecorder1();
            assert(_rec134._expr(_rec134._capt(_rec134._capt(_rec134._capt(_rec134._capt(_rec134._capt(Float16Array, 'arguments/0/left/object/object/object').prototype, 'arguments/0/left/object/object').entries, 'arguments/0/left/object').name, 'arguments/0/left') === 'entries', 'arguments/0'), {
                content: 'assert(Float16Array.prototype.entries.name === "entries")',
                filepath: 'test/Float16Array.js',
                line: 736
            }));
        });
        it('property `length` is 0', () => {
            var _rec135 = new _PowerAssertRecorder1();
            assert(_rec135._expr(_rec135._capt(_rec135._capt(_rec135._capt(_rec135._capt(_rec135._capt(Float16Array, 'arguments/0/left/object/object/object').prototype, 'arguments/0/left/object/object').entries, 'arguments/0/left/object').length, 'arguments/0/left') === 0, 'arguments/0'), {
                content: 'assert(Float16Array.prototype.entries.length === 0)',
                filepath: 'test/Float16Array.js',
                line: 740
            }));
        });
        it('get entries', () => {
            var _rec136 = new _PowerAssertRecorder1();
            var _rec137 = new _PowerAssertRecorder1();
            const float16 = new Float16Array([
                1,
                2,
                3
            ]);
            const array = [...float16.entries()];
            assert.deepStrictEqual(_rec136._expr(_rec136._capt(array, 'arguments/0'), {
                content: 'assert.deepStrictEqual(array, [[0,1],[1,2],[2,3]])',
                filepath: 'test/Float16Array.js',
                line: 747
            }), _rec137._expr(_rec137._capt([
                _rec137._capt([
                    0,
                    1
                ], 'arguments/1/elements/0'),
                _rec137._capt([
                    1,
                    2
                ], 'arguments/1/elements/1'),
                _rec137._capt([
                    2,
                    3
                ], 'arguments/1/elements/2')
            ], 'arguments/1'), {
                content: 'assert.deepStrictEqual(array, [[0,1],[1,2],[2,3]])',
                filepath: 'test/Float16Array.js',
                line: 747
            }));
        });
        it('suspend to iterate entries', () => {
            var _rec138 = new _PowerAssertRecorder1();
            var _rec139 = new _PowerAssertRecorder1();
            var _rec140 = new _PowerAssertRecorder1();
            var _rec141 = new _PowerAssertRecorder1();
            const float16 = new Float16Array([
                1,
                2,
                3
            ]);
            const iterator = float16.entries();
            for (const [_, value] of iterator) {
                if (value === 2) {
                    break;
                }
            }
            assert.deepStrictEqual(_rec138._expr(_rec138._capt(_rec138._capt(iterator, 'arguments/0/callee/object').next(), 'arguments/0'), {
                content: 'assert.deepStrictEqual(iterator.next(), {value: [2,3],done: false})',
                filepath: 'test/Float16Array.js',
                line: 761
            }), _rec139._expr(_rec139._capt({
                value: _rec139._capt([
                    2,
                    3
                ], 'arguments/1/properties/0/value'),
                done: false
            }, 'arguments/1'), {
                content: 'assert.deepStrictEqual(iterator.next(), {value: [2,3],done: false})',
                filepath: 'test/Float16Array.js',
                line: 761
            }));
            assert.deepStrictEqual(_rec140._expr(_rec140._capt(_rec140._capt(iterator, 'arguments/0/callee/object').next(), 'arguments/0'), {
                content: 'assert.deepStrictEqual(iterator.next(), {value: undefined,done: true})',
                filepath: 'test/Float16Array.js',
                line: 762
            }), _rec141._expr(_rec141._capt({
                value: _rec141._capt(undefined, 'arguments/1/properties/0/value'),
                done: true
            }, 'arguments/1'), {
                content: 'assert.deepStrictEqual(iterator.next(), {value: undefined,done: true})',
                filepath: 'test/Float16Array.js',
                line: 762
            }));
        });
    });
    describe('#at()', () => {
        it('property `name` is \'at\'', () => {
            var _rec142 = new _PowerAssertRecorder1();
            assert(_rec142._expr(_rec142._capt(_rec142._capt(_rec142._capt(_rec142._capt(_rec142._capt(Float16Array, 'arguments/0/left/object/object/object').prototype, 'arguments/0/left/object/object').at, 'arguments/0/left/object').name, 'arguments/0/left') === 'at', 'arguments/0'), {
                content: 'assert(Float16Array.prototype.at.name === "at")',
                filepath: 'test/Float16Array.js',
                line: 768
            }));
        });
        it('property `length` is 1', () => {
            var _rec143 = new _PowerAssertRecorder1();
            assert(_rec143._expr(_rec143._capt(_rec143._capt(_rec143._capt(_rec143._capt(_rec143._capt(Float16Array, 'arguments/0/left/object/object/object').prototype, 'arguments/0/left/object/object').at, 'arguments/0/left/object').length, 'arguments/0/left') === 1, 'arguments/0'), {
                content: 'assert(Float16Array.prototype.at.length === 1)',
                filepath: 'test/Float16Array.js',
                line: 772
            }));
        });
        it('get values', () => {
            var _rec144 = new _PowerAssertRecorder1();
            var _rec145 = new _PowerAssertRecorder1();
            var _rec146 = new _PowerAssertRecorder1();
            const float16 = new Float16Array([
                1,
                2,
                3
            ]);
            assert(_rec144._expr(_rec144._capt(_rec144._capt(_rec144._capt(float16, 'arguments/0/left/callee/object').at(0), 'arguments/0/left') === 1, 'arguments/0'), {
                content: 'assert(float16.at(0) === 1)',
                filepath: 'test/Float16Array.js',
                line: 778
            }));
            assert(_rec145._expr(_rec145._capt(_rec145._capt(_rec145._capt(float16, 'arguments/0/left/callee/object').at(_rec145._capt(-1, 'arguments/0/left/arguments/0')), 'arguments/0/left') === 3, 'arguments/0'), {
                content: 'assert(float16.at(-1) === 3)',
                filepath: 'test/Float16Array.js',
                line: 779
            }));
            assert(_rec146._expr(_rec146._capt(_rec146._capt(_rec146._capt(float16, 'arguments/0/left/callee/object').at(4), 'arguments/0/left') === _rec146._capt(undefined, 'arguments/0/right'), 'arguments/0'), {
                content: 'assert(float16.at(4) === undefined)',
                filepath: 'test/Float16Array.js',
                line: 780
            }));
        });
        it('throw TypeError with invalid index', () => {
            const float16 = new Float16Array([
                1,
                2,
                3
            ]);
            assert.throws(() => {
                float16.at(Symbol(), 0);
            }, TypeError);
            if (typeof BigInt !== 'undefined') {
                assert.throws(() => {
                    float16.at(BigInt(0), 0);
                }, TypeError);
            }
        });
    });
    describe('#map()', () => {
        it('property `name` is \'map\'', () => {
            var _rec147 = new _PowerAssertRecorder1();
            assert(_rec147._expr(_rec147._capt(_rec147._capt(_rec147._capt(_rec147._capt(_rec147._capt(Float16Array, 'arguments/0/left/object/object/object').prototype, 'arguments/0/left/object/object').map, 'arguments/0/left/object').name, 'arguments/0/left') === 'map', 'arguments/0'), {
                content: 'assert(Float16Array.prototype.map.name === "map")',
                filepath: 'test/Float16Array.js',
                line: 801
            }));
        });
        it('property `length` is 1', () => {
            var _rec148 = new _PowerAssertRecorder1();
            assert(_rec148._expr(_rec148._capt(_rec148._capt(_rec148._capt(_rec148._capt(_rec148._capt(Float16Array, 'arguments/0/left/object/object/object').prototype, 'arguments/0/left/object/object').map, 'arguments/0/left/object').length, 'arguments/0/left') === 1, 'arguments/0'), {
                content: 'assert(Float16Array.prototype.map.length === 1)',
                filepath: 'test/Float16Array.js',
                line: 805
            }));
        });
        it('check callback arguments', () => {
            const float16 = new Float16Array([1]);
            const thisArg = {};
            float16.map(function (val, key, f16) {
                var _rec149 = new _PowerAssertRecorder1();
                var _rec150 = new _PowerAssertRecorder1();
                var _rec151 = new _PowerAssertRecorder1();
                var _rec152 = new _PowerAssertRecorder1();
                assert(_rec149._expr(_rec149._capt(_rec149._capt(val, 'arguments/0/left') === 1, 'arguments/0'), {
                    content: 'assert(val === 1)',
                    filepath: 'test/Float16Array.js',
                    line: 813
                }));
                assert(_rec150._expr(_rec150._capt(_rec150._capt(key, 'arguments/0/left') === 0, 'arguments/0'), {
                    content: 'assert(key === 0)',
                    filepath: 'test/Float16Array.js',
                    line: 814
                }));
                assert(_rec151._expr(_rec151._capt(_rec151._capt(f16, 'arguments/0/left') === _rec151._capt(float16, 'arguments/0/right'), 'arguments/0'), {
                    content: 'assert(f16 === float16)',
                    filepath: 'test/Float16Array.js',
                    line: 815
                }));
                assert(_rec152._expr(_rec152._capt(this === _rec152._capt(thisArg, 'arguments/0/right'), 'arguments/0'), {
                    content: 'assert(this === thisArg)',
                    filepath: 'test/Float16Array.js',
                    line: 816
                }));
            }, thisArg);
        });
        it('get x2', () => {
            var _rec153 = new _PowerAssertRecorder1();
            const float16_1 = new Float16Array([
                1,
                2,
                3,
                4
            ]);
            const float16_2 = float16_1.map(val => val * 2);
            assert(_rec153._expr(_rec153._capt(_rec153._capt(float16_2, 'arguments/0/left') instanceof _rec153._capt(Float16Array, 'arguments/0/right'), 'arguments/0'), {
                content: 'assert(float16_2 instanceof Float16Array)',
                filepath: 'test/Float16Array.js',
                line: 824
            }));
            assert.equalFloat16ArrayValues(float16_2, [
                2,
                4,
                6,
                8
            ]);
        });
        it('respect @@species', () => {
            var _rec159 = new _PowerAssertRecorder1();
            var _rec160 = new _PowerAssertRecorder1();
            var _rec161 = new _PowerAssertRecorder1();
            let step = 0;
            class Foo extends Float16Array {
                constructor(...args) {
                    var _rec154 = new _PowerAssertRecorder1();
                    var _rec155 = new _PowerAssertRecorder1();
                    var _rec156 = new _PowerAssertRecorder1();
                    var _rec157 = new _PowerAssertRecorder1();
                    var _rec158 = new _PowerAssertRecorder1();
                    super(...args);
                    if (step === 0) {
                        assert(_rec154._expr(_rec154._capt(_rec154._capt(_rec154._capt(args, 'arguments/0/left/object').length, 'arguments/0/left') === 1, 'arguments/0'), {
                            content: 'assert(args.length === 1)',
                            filepath: 'test/Float16Array.js',
                            line: 834
                        }));
                        assert.deepStrictEqual(_rec155._expr(_rec155._capt(_rec155._capt(args, 'arguments/0/object')[0], 'arguments/0'), {
                            content: 'assert.deepStrictEqual(args[0], [1,2,3,4])',
                            filepath: 'test/Float16Array.js',
                            line: 835
                        }), _rec156._expr(_rec156._capt([
                            1,
                            2,
                            3,
                            4
                        ], 'arguments/1'), {
                            content: 'assert.deepStrictEqual(args[0], [1,2,3,4])',
                            filepath: 'test/Float16Array.js',
                            line: 835
                        }));
                        ++step;
                    } else {
                        assert.deepStrictEqual(_rec157._expr(_rec157._capt(args, 'arguments/0'), {
                            content: 'assert.deepStrictEqual(args, [4])',
                            filepath: 'test/Float16Array.js',
                            line: 838
                        }), _rec158._expr(_rec158._capt([4], 'arguments/1'), {
                            content: 'assert.deepStrictEqual(args, [4])',
                            filepath: 'test/Float16Array.js',
                            line: 838
                        }));
                    }
                }
            }
            const foo = new Foo([
                1,
                2,
                3,
                4
            ]).map(val => val);
            assert(_rec159._expr(_rec159._capt(_rec159._capt(foo, 'arguments/0/left') instanceof _rec159._capt(Foo, 'arguments/0/right'), 'arguments/0'), {
                content: 'assert(foo instanceof Foo)',
                filepath: 'test/Float16Array.js',
                line: 843
            }));
            assert.equalFloat16ArrayValues(foo, [
                1,
                2,
                3,
                4
            ]);
            class Bar extends Float16Array {
                static get [Symbol.species]() {
                    return Float16Array;
                }
            }
            const bar = new Bar([
                1,
                2,
                3,
                4
            ]).map(val => val);
            assert(_rec160._expr(_rec160._capt(!_rec160._capt(_rec160._capt(bar, 'arguments/0/argument/left') instanceof _rec160._capt(Bar, 'arguments/0/argument/right'), 'arguments/0/argument'), 'arguments/0'), {
                content: 'assert(!(bar instanceof Bar))',
                filepath: 'test/Float16Array.js',
                line: 852
            }));
            assert(_rec161._expr(_rec161._capt(_rec161._capt(bar, 'arguments/0/left') instanceof _rec161._capt(Float16Array, 'arguments/0/right'), 'arguments/0'), {
                content: 'assert(bar instanceof Float16Array)',
                filepath: 'test/Float16Array.js',
                line: 853
            }));
            assert.equalFloat16ArrayValues(bar, [
                1,
                2,
                3,
                4
            ]);
        });
        it('SpeciesConstructor must return a TypedArray of the same Content Type', function () {
            class Foo extends Float16Array {
                static get [Symbol.species]() {
                    return Array;
                }
            }
            const foo = new Foo([
                1,
                2,
                3,
                4
            ]);
            assert.throws(() => foo.map(val => val), TypeError);
            if (typeof BigUint64Array !== 'undefined') {
                class Bar extends Float16Array {
                    static get [Symbol.species]() {
                        return BigUint64Array;
                    }
                }
                const bar = new Bar([
                    1,
                    2,
                    3,
                    4
                ]);
                assert.throws(() => bar.map(val => val), TypeError);
            }
        });
        it('Constructor created TypedArray which was too small', function () {
            class Foo extends Float16Array {
                constructor(...args) {
                    if (typeof args[0] === 'number') {
                        super(args[0] / 2, ...args.slice(1));
                    } else {
                        super(...args);
                    }
                }
            }
            const foo = new Foo([
                1,
                2,
                3,
                4
            ]);
            assert.throws(() => foo.map(val => val), TypeError);
            class Bar extends Float16Array {
                static get [Symbol.species]() {
                    return Baz;
                }
            }
            class Baz extends Uint16Array {
                constructor(...args) {
                    if (typeof args[0] === 'number') {
                        super(args[0] / 2, ...args.slice(1));
                    } else {
                        super(...args);
                    }
                }
            }
            const bar = new Bar([
                1,
                2,
                3,
                4
            ]);
            assert.throws(() => bar.map(val => val), TypeError);
        });
    });
    describe('#filter()', () => {
        it('property `name` is \'filter\'', () => {
            var _rec162 = new _PowerAssertRecorder1();
            assert(_rec162._expr(_rec162._capt(_rec162._capt(_rec162._capt(_rec162._capt(_rec162._capt(Float16Array, 'arguments/0/left/object/object/object').prototype, 'arguments/0/left/object/object').filter, 'arguments/0/left/object').name, 'arguments/0/left') === 'filter', 'arguments/0'), {
                content: 'assert(Float16Array.prototype.filter.name === "filter")',
                filepath: 'test/Float16Array.js',
                line: 911
            }));
        });
        it('property `length` is 1', () => {
            var _rec163 = new _PowerAssertRecorder1();
            assert(_rec163._expr(_rec163._capt(_rec163._capt(_rec163._capt(_rec163._capt(_rec163._capt(Float16Array, 'arguments/0/left/object/object/object').prototype, 'arguments/0/left/object/object').filter, 'arguments/0/left/object').length, 'arguments/0/left') === 1, 'arguments/0'), {
                content: 'assert(Float16Array.prototype.filter.length === 1)',
                filepath: 'test/Float16Array.js',
                line: 915
            }));
        });
        it('check callback arguments', () => {
            const float16 = new Float16Array([1]);
            const thisArg = {};
            float16.filter(function (val, key, f16) {
                var _rec164 = new _PowerAssertRecorder1();
                var _rec165 = new _PowerAssertRecorder1();
                var _rec166 = new _PowerAssertRecorder1();
                var _rec167 = new _PowerAssertRecorder1();
                assert(_rec164._expr(_rec164._capt(_rec164._capt(val, 'arguments/0/left') === 1, 'arguments/0'), {
                    content: 'assert(val === 1)',
                    filepath: 'test/Float16Array.js',
                    line: 923
                }));
                assert(_rec165._expr(_rec165._capt(_rec165._capt(key, 'arguments/0/left') === 0, 'arguments/0'), {
                    content: 'assert(key === 0)',
                    filepath: 'test/Float16Array.js',
                    line: 924
                }));
                assert(_rec166._expr(_rec166._capt(_rec166._capt(f16, 'arguments/0/left') === _rec166._capt(float16, 'arguments/0/right'), 'arguments/0'), {
                    content: 'assert(f16 === float16)',
                    filepath: 'test/Float16Array.js',
                    line: 925
                }));
                assert(_rec167._expr(_rec167._capt(this === _rec167._capt(thisArg, 'arguments/0/right'), 'arguments/0'), {
                    content: 'assert(this === thisArg)',
                    filepath: 'test/Float16Array.js',
                    line: 926
                }));
            }, thisArg);
        });
        it('filter even value', () => {
            var _rec168 = new _PowerAssertRecorder1();
            const float16_1 = new Float16Array([
                1,
                2,
                3,
                4
            ]);
            const float16_2 = float16_1.filter(val => val % 2 === 0);
            assert(_rec168._expr(_rec168._capt(_rec168._capt(float16_2, 'arguments/0/left') instanceof _rec168._capt(Float16Array, 'arguments/0/right'), 'arguments/0'), {
                content: 'assert(float16_2 instanceof Float16Array)',
                filepath: 'test/Float16Array.js',
                line: 934
            }));
            assert.equalFloat16ArrayValues(float16_2, [
                2,
                4
            ]);
        });
        it('respect @@species', () => {
            var _rec175 = new _PowerAssertRecorder1();
            var _rec176 = new _PowerAssertRecorder1();
            var _rec177 = new _PowerAssertRecorder1();
            let step = 0;
            class Foo extends Float16Array {
                constructor(...args) {
                    var _rec169 = new _PowerAssertRecorder1();
                    var _rec170 = new _PowerAssertRecorder1();
                    var _rec171 = new _PowerAssertRecorder1();
                    var _rec172 = new _PowerAssertRecorder1();
                    var _rec173 = new _PowerAssertRecorder1();
                    var _rec174 = new _PowerAssertRecorder1();
                    super(...args);
                    if (step === 0) {
                        assert(_rec169._expr(_rec169._capt(_rec169._capt(_rec169._capt(args, 'arguments/0/left/object').length, 'arguments/0/left') === 1, 'arguments/0'), {
                            content: 'assert(args.length === 1)',
                            filepath: 'test/Float16Array.js',
                            line: 944
                        }));
                        assert.deepStrictEqual(_rec170._expr(_rec170._capt(_rec170._capt(args, 'arguments/0/object')[0], 'arguments/0'), {
                            content: 'assert.deepStrictEqual(args[0], [1,2,3,4])',
                            filepath: 'test/Float16Array.js',
                            line: 945
                        }), _rec171._expr(_rec171._capt([
                            1,
                            2,
                            3,
                            4
                        ], 'arguments/1'), {
                            content: 'assert.deepStrictEqual(args[0], [1,2,3,4])',
                            filepath: 'test/Float16Array.js',
                            line: 945
                        }));
                        ++step;
                    } else {
                        assert(_rec172._expr(_rec172._capt(_rec172._capt(_rec172._capt(args, 'arguments/0/left/object').length, 'arguments/0/left') === 1, 'arguments/0'), {
                            content: 'assert(args.length === 1)',
                            filepath: 'test/Float16Array.js',
                            line: 948
                        }));
                        assert.deepStrictEqual(_rec173._expr(_rec173._capt(_rec173._capt(args, 'arguments/0/object')[0], 'arguments/0'), {
                            content: 'assert.deepStrictEqual(args[0], [1,2,3,4])',
                            filepath: 'test/Float16Array.js',
                            line: 949
                        }), _rec174._expr(_rec174._capt([
                            1,
                            2,
                            3,
                            4
                        ], 'arguments/1'), {
                            content: 'assert.deepStrictEqual(args[0], [1,2,3,4])',
                            filepath: 'test/Float16Array.js',
                            line: 949
                        }));
                    }
                }
            }
            const foo = new Foo([
                1,
                2,
                3,
                4
            ]).filter(() => true);
            assert(_rec175._expr(_rec175._capt(_rec175._capt(foo, 'arguments/0/left') instanceof _rec175._capt(Foo, 'arguments/0/right'), 'arguments/0'), {
                content: 'assert(foo instanceof Foo)',
                filepath: 'test/Float16Array.js',
                line: 954
            }));
            assert.equalFloat16ArrayValues(foo, [
                1,
                2,
                3,
                4
            ]);
            class Bar extends Float16Array {
                static get [Symbol.species]() {
                    return Float16Array;
                }
            }
            const bar = new Bar([
                1,
                2,
                3,
                4
            ]).filter(() => true);
            assert(_rec176._expr(_rec176._capt(!_rec176._capt(_rec176._capt(bar, 'arguments/0/argument/left') instanceof _rec176._capt(Bar, 'arguments/0/argument/right'), 'arguments/0/argument'), 'arguments/0'), {
                content: 'assert(!(bar instanceof Bar))',
                filepath: 'test/Float16Array.js',
                line: 963
            }));
            assert(_rec177._expr(_rec177._capt(_rec177._capt(bar, 'arguments/0/left') instanceof _rec177._capt(Float16Array, 'arguments/0/right'), 'arguments/0'), {
                content: 'assert(bar instanceof Float16Array)',
                filepath: 'test/Float16Array.js',
                line: 964
            }));
            assert.equalFloat16ArrayValues(bar, [
                1,
                2,
                3,
                4
            ]);
        });
        it('SpeciesConstructor must return a TypedArray of the same Content Type', function () {
            class Foo extends Float16Array {
                static get [Symbol.species]() {
                    return Array;
                }
            }
            const foo = new Foo([
                1,
                2,
                3,
                4
            ]);
            assert.throws(() => foo.filter(() => true), TypeError);
            if (typeof BigUint64Array !== 'undefined') {
                class Bar extends Float16Array {
                    static get [Symbol.species]() {
                        return BigUint64Array;
                    }
                }
                const bar = new Bar([
                    1,
                    2,
                    3,
                    4
                ]);
                assert.throws(() => bar.filter(() => true), TypeError);
            }
        });
    });
    describe('#reduce()', () => {
        it('property `name` is \'reduce\'', () => {
            var _rec178 = new _PowerAssertRecorder1();
            assert(_rec178._expr(_rec178._capt(_rec178._capt(_rec178._capt(_rec178._capt(_rec178._capt(Float16Array, 'arguments/0/left/object/object/object').prototype, 'arguments/0/left/object/object').reduce, 'arguments/0/left/object').name, 'arguments/0/left') === 'reduce', 'arguments/0'), {
                content: 'assert(Float16Array.prototype.reduce.name === "reduce")',
                filepath: 'test/Float16Array.js',
                line: 991
            }));
        });
        it('property `length` is 1', () => {
            var _rec179 = new _PowerAssertRecorder1();
            assert(_rec179._expr(_rec179._capt(_rec179._capt(_rec179._capt(_rec179._capt(_rec179._capt(Float16Array, 'arguments/0/left/object/object/object').prototype, 'arguments/0/left/object/object').reduce, 'arguments/0/left/object').length, 'arguments/0/left') === 1, 'arguments/0'), {
                content: 'assert(Float16Array.prototype.reduce.length === 1)',
                filepath: 'test/Float16Array.js',
                line: 995
            }));
        });
        it('check callback arguments', () => {
            const float16_1 = new Float16Array([
                1,
                2
            ]);
            float16_1.reduce(function (prev, current, key, f16) {
                var _rec180 = new _PowerAssertRecorder1();
                var _rec181 = new _PowerAssertRecorder1();
                var _rec182 = new _PowerAssertRecorder1();
                var _rec183 = new _PowerAssertRecorder1();
                assert(_rec180._expr(_rec180._capt(_rec180._capt(prev, 'arguments/0/left') === 1, 'arguments/0'), {
                    content: 'assert(prev === 1)',
                    filepath: 'test/Float16Array.js',
                    line: 1002
                }));
                assert(_rec181._expr(_rec181._capt(_rec181._capt(current, 'arguments/0/left') === 2, 'arguments/0'), {
                    content: 'assert(current === 2)',
                    filepath: 'test/Float16Array.js',
                    line: 1003
                }));
                assert(_rec182._expr(_rec182._capt(_rec182._capt(key, 'arguments/0/left') === 1, 'arguments/0'), {
                    content: 'assert(key === 1)',
                    filepath: 'test/Float16Array.js',
                    line: 1004
                }));
                assert(_rec183._expr(_rec183._capt(_rec183._capt(f16, 'arguments/0/left') === _rec183._capt(float16_1, 'arguments/0/right'), 'arguments/0'), {
                    content: 'assert(f16 === float16_1)',
                    filepath: 'test/Float16Array.js',
                    line: 1005
                }));
            });
            const float16_2 = new Float16Array([2]);
            float16_2.reduce(function (prev, current, key, f16) {
                var _rec184 = new _PowerAssertRecorder1();
                var _rec185 = new _PowerAssertRecorder1();
                var _rec186 = new _PowerAssertRecorder1();
                var _rec187 = new _PowerAssertRecorder1();
                assert(_rec184._expr(_rec184._capt(_rec184._capt(prev, 'arguments/0/left') === 1, 'arguments/0'), {
                    content: 'assert(prev === 1)',
                    filepath: 'test/Float16Array.js',
                    line: 1011
                }));
                assert(_rec185._expr(_rec185._capt(_rec185._capt(current, 'arguments/0/left') === 2, 'arguments/0'), {
                    content: 'assert(current === 2)',
                    filepath: 'test/Float16Array.js',
                    line: 1012
                }));
                assert(_rec186._expr(_rec186._capt(_rec186._capt(key, 'arguments/0/left') === 0, 'arguments/0'), {
                    content: 'assert(key === 0)',
                    filepath: 'test/Float16Array.js',
                    line: 1013
                }));
                assert(_rec187._expr(_rec187._capt(_rec187._capt(f16, 'arguments/0/left') === _rec187._capt(float16_2, 'arguments/0/right'), 'arguments/0'), {
                    content: 'assert(f16 === float16_2)',
                    filepath: 'test/Float16Array.js',
                    line: 1014
                }));
            }, 1);
        });
        it('add as string', () => {
            var _rec188 = new _PowerAssertRecorder1();
            const float16 = new Float16Array([
                1,
                2,
                3
            ]);
            const val = float16.reduce((prev, current) => prev + current, '');
            assert(_rec188._expr(_rec188._capt(_rec188._capt(val, 'arguments/0/left') === '123', 'arguments/0'), {
                content: 'assert(val === "123")',
                filepath: 'test/Float16Array.js',
                line: 1021
            }));
        });
        it('throw TypeError on empty array with no initial value', () => {
            const float16 = new Float16Array();
            assert.throws(() => float16.reduce(() => {
            }), TypeError);
        });
    });
    describe('#reduceRight()', () => {
        it('property `name` is \'reduceRight\'', () => {
            var _rec189 = new _PowerAssertRecorder1();
            assert(_rec189._expr(_rec189._capt(_rec189._capt(_rec189._capt(_rec189._capt(_rec189._capt(Float16Array, 'arguments/0/left/object/object/object').prototype, 'arguments/0/left/object/object').reduceRight, 'arguments/0/left/object').name, 'arguments/0/left') === 'reduceRight', 'arguments/0'), {
                content: 'assert(Float16Array.prototype.reduceRight.name === "reduceRight")',
                filepath: 'test/Float16Array.js',
                line: 1032
            }));
        });
        it('property `length` is 1', () => {
            var _rec190 = new _PowerAssertRecorder1();
            assert(_rec190._expr(_rec190._capt(_rec190._capt(_rec190._capt(_rec190._capt(_rec190._capt(Float16Array, 'arguments/0/left/object/object/object').prototype, 'arguments/0/left/object/object').reduceRight, 'arguments/0/left/object').length, 'arguments/0/left') === 1, 'arguments/0'), {
                content: 'assert(Float16Array.prototype.reduceRight.length === 1)',
                filepath: 'test/Float16Array.js',
                line: 1036
            }));
        });
        it('check callback arguments', () => {
            const float16_1 = new Float16Array([
                1,
                2
            ]);
            float16_1.reduceRight(function (prev, current, key, f16) {
                var _rec191 = new _PowerAssertRecorder1();
                var _rec192 = new _PowerAssertRecorder1();
                var _rec193 = new _PowerAssertRecorder1();
                var _rec194 = new _PowerAssertRecorder1();
                assert(_rec191._expr(_rec191._capt(_rec191._capt(prev, 'arguments/0/left') === 2, 'arguments/0'), {
                    content: 'assert(prev === 2)',
                    filepath: 'test/Float16Array.js',
                    line: 1043
                }));
                assert(_rec192._expr(_rec192._capt(_rec192._capt(current, 'arguments/0/left') === 1, 'arguments/0'), {
                    content: 'assert(current === 1)',
                    filepath: 'test/Float16Array.js',
                    line: 1044
                }));
                assert(_rec193._expr(_rec193._capt(_rec193._capt(key, 'arguments/0/left') === 0, 'arguments/0'), {
                    content: 'assert(key === 0)',
                    filepath: 'test/Float16Array.js',
                    line: 1045
                }));
                assert(_rec194._expr(_rec194._capt(_rec194._capt(f16, 'arguments/0/left') === _rec194._capt(float16_1, 'arguments/0/right'), 'arguments/0'), {
                    content: 'assert(f16 === float16_1)',
                    filepath: 'test/Float16Array.js',
                    line: 1046
                }));
            });
            const float16_2 = new Float16Array([2]);
            float16_2.reduceRight(function (prev, current, key, f16) {
                var _rec195 = new _PowerAssertRecorder1();
                var _rec196 = new _PowerAssertRecorder1();
                var _rec197 = new _PowerAssertRecorder1();
                var _rec198 = new _PowerAssertRecorder1();
                assert(_rec195._expr(_rec195._capt(_rec195._capt(prev, 'arguments/0/left') === 1, 'arguments/0'), {
                    content: 'assert(prev === 1)',
                    filepath: 'test/Float16Array.js',
                    line: 1052
                }));
                assert(_rec196._expr(_rec196._capt(_rec196._capt(current, 'arguments/0/left') === 2, 'arguments/0'), {
                    content: 'assert(current === 2)',
                    filepath: 'test/Float16Array.js',
                    line: 1053
                }));
                assert(_rec197._expr(_rec197._capt(_rec197._capt(key, 'arguments/0/left') === 0, 'arguments/0'), {
                    content: 'assert(key === 0)',
                    filepath: 'test/Float16Array.js',
                    line: 1054
                }));
                assert(_rec198._expr(_rec198._capt(_rec198._capt(f16, 'arguments/0/left') === _rec198._capt(float16_2, 'arguments/0/right'), 'arguments/0'), {
                    content: 'assert(f16 === float16_2)',
                    filepath: 'test/Float16Array.js',
                    line: 1055
                }));
            }, 1);
        });
        it('add as string', () => {
            var _rec199 = new _PowerAssertRecorder1();
            const float16 = new Float16Array([
                1,
                2,
                3
            ]);
            const val = float16.reduceRight((prev, current) => prev + current, '');
            assert(_rec199._expr(_rec199._capt(_rec199._capt(val, 'arguments/0/left') === '321', 'arguments/0'), {
                content: 'assert(val === "321")',
                filepath: 'test/Float16Array.js',
                line: 1062
            }));
        });
        it('throw TypeError on empty array with no initial value', () => {
            const float16 = new Float16Array();
            assert.throws(() => float16.reduce(() => {
            }), TypeError);
        });
    });
    describe('#forEach()', () => {
        it('property `name` is \'forEach\'', () => {
            var _rec200 = new _PowerAssertRecorder1();
            assert(_rec200._expr(_rec200._capt(_rec200._capt(_rec200._capt(_rec200._capt(_rec200._capt(Float16Array, 'arguments/0/left/object/object/object').prototype, 'arguments/0/left/object/object').forEach, 'arguments/0/left/object').name, 'arguments/0/left') === 'forEach', 'arguments/0'), {
                content: 'assert(Float16Array.prototype.forEach.name === "forEach")',
                filepath: 'test/Float16Array.js',
                line: 1073
            }));
        });
        it('property `length` is 1', () => {
            var _rec201 = new _PowerAssertRecorder1();
            assert(_rec201._expr(_rec201._capt(_rec201._capt(_rec201._capt(_rec201._capt(_rec201._capt(Float16Array, 'arguments/0/left/object/object/object').prototype, 'arguments/0/left/object/object').forEach, 'arguments/0/left/object').length, 'arguments/0/left') === 1, 'arguments/0'), {
                content: 'assert(Float16Array.prototype.forEach.length === 1)',
                filepath: 'test/Float16Array.js',
                line: 1077
            }));
        });
        it('check callback arguments', () => {
            const float16 = new Float16Array([1]);
            const thisArg = {};
            float16.forEach(function (val, key, f16) {
                var _rec202 = new _PowerAssertRecorder1();
                var _rec203 = new _PowerAssertRecorder1();
                var _rec204 = new _PowerAssertRecorder1();
                var _rec205 = new _PowerAssertRecorder1();
                assert(_rec202._expr(_rec202._capt(_rec202._capt(val, 'arguments/0/left') === 1, 'arguments/0'), {
                    content: 'assert(val === 1)',
                    filepath: 'test/Float16Array.js',
                    line: 1085
                }));
                assert(_rec203._expr(_rec203._capt(_rec203._capt(key, 'arguments/0/left') === 0, 'arguments/0'), {
                    content: 'assert(key === 0)',
                    filepath: 'test/Float16Array.js',
                    line: 1086
                }));
                assert(_rec204._expr(_rec204._capt(_rec204._capt(f16, 'arguments/0/left') === _rec204._capt(float16, 'arguments/0/right'), 'arguments/0'), {
                    content: 'assert(f16 === float16)',
                    filepath: 'test/Float16Array.js',
                    line: 1087
                }));
                assert(_rec205._expr(_rec205._capt(this === _rec205._capt(thisArg, 'arguments/0/right'), 'arguments/0'), {
                    content: 'assert(this === thisArg)',
                    filepath: 'test/Float16Array.js',
                    line: 1088
                }));
            }, thisArg);
        });
    });
    describe('#find()', () => {
        it('property `name` is \'find\'', () => {
            var _rec206 = new _PowerAssertRecorder1();
            assert(_rec206._expr(_rec206._capt(_rec206._capt(_rec206._capt(_rec206._capt(_rec206._capt(Float16Array, 'arguments/0/left/object/object/object').prototype, 'arguments/0/left/object/object').find, 'arguments/0/left/object').name, 'arguments/0/left') === 'find', 'arguments/0'), {
                content: 'assert(Float16Array.prototype.find.name === "find")',
                filepath: 'test/Float16Array.js',
                line: 1095
            }));
        });
        it('property `length` is 1', () => {
            var _rec207 = new _PowerAssertRecorder1();
            assert(_rec207._expr(_rec207._capt(_rec207._capt(_rec207._capt(_rec207._capt(_rec207._capt(Float16Array, 'arguments/0/left/object/object/object').prototype, 'arguments/0/left/object/object').find, 'arguments/0/left/object').length, 'arguments/0/left') === 1, 'arguments/0'), {
                content: 'assert(Float16Array.prototype.find.length === 1)',
                filepath: 'test/Float16Array.js',
                line: 1099
            }));
        });
        it('check callback arguments', () => {
            const float16 = new Float16Array([1]);
            const thisArg = {};
            float16.find(function (val, key, f16) {
                var _rec208 = new _PowerAssertRecorder1();
                var _rec209 = new _PowerAssertRecorder1();
                var _rec210 = new _PowerAssertRecorder1();
                var _rec211 = new _PowerAssertRecorder1();
                assert(_rec208._expr(_rec208._capt(_rec208._capt(val, 'arguments/0/left') === 1, 'arguments/0'), {
                    content: 'assert(val === 1)',
                    filepath: 'test/Float16Array.js',
                    line: 1107
                }));
                assert(_rec209._expr(_rec209._capt(_rec209._capt(key, 'arguments/0/left') === 0, 'arguments/0'), {
                    content: 'assert(key === 0)',
                    filepath: 'test/Float16Array.js',
                    line: 1108
                }));
                assert(_rec210._expr(_rec210._capt(_rec210._capt(f16, 'arguments/0/left') === _rec210._capt(float16, 'arguments/0/right'), 'arguments/0'), {
                    content: 'assert(f16 === float16)',
                    filepath: 'test/Float16Array.js',
                    line: 1109
                }));
                assert(_rec211._expr(_rec211._capt(this === _rec211._capt(thisArg, 'arguments/0/right'), 'arguments/0'), {
                    content: 'assert(this === thisArg)',
                    filepath: 'test/Float16Array.js',
                    line: 1110
                }));
            }, thisArg);
        });
        it('find even value', () => {
            var _rec212 = new _PowerAssertRecorder1();
            var _rec213 = new _PowerAssertRecorder1();
            const float16_1 = new Float16Array([
                1,
                2,
                3,
                4
            ]);
            assert(_rec212._expr(_rec212._capt(_rec212._capt(_rec212._capt(float16_1, 'arguments/0/left/callee/object').find(val => val % 2 === 0), 'arguments/0/left') === 2, 'arguments/0'), {
                content: 'assert(float16_1.find(val => val % 2 === 0) === 2)',
                filepath: 'test/Float16Array.js',
                line: 1116
            }));
            const float16_2 = new Float16Array([
                1,
                3,
                5
            ]);
            assert(_rec213._expr(_rec213._capt(_rec213._capt(_rec213._capt(float16_2, 'arguments/0/left/callee/object').find(val => val % 2 === 0), 'arguments/0/left') === _rec213._capt(undefined, 'arguments/0/right'), 'arguments/0'), {
                content: 'assert(float16_2.find(val => val % 2 === 0) === undefined)',
                filepath: 'test/Float16Array.js',
                line: 1119
            }));
        });
    });
    describe('#findIndex()', () => {
        it('property `name` is \'findIndex\'', () => {
            var _rec214 = new _PowerAssertRecorder1();
            assert(_rec214._expr(_rec214._capt(_rec214._capt(_rec214._capt(_rec214._capt(_rec214._capt(Float16Array, 'arguments/0/left/object/object/object').prototype, 'arguments/0/left/object/object').findIndex, 'arguments/0/left/object').name, 'arguments/0/left') === 'findIndex', 'arguments/0'), {
                content: 'assert(Float16Array.prototype.findIndex.name === "findIndex")',
                filepath: 'test/Float16Array.js',
                line: 1125
            }));
        });
        it('property `length` is 1', () => {
            var _rec215 = new _PowerAssertRecorder1();
            assert(_rec215._expr(_rec215._capt(_rec215._capt(_rec215._capt(_rec215._capt(_rec215._capt(Float16Array, 'arguments/0/left/object/object/object').prototype, 'arguments/0/left/object/object').findIndex, 'arguments/0/left/object').length, 'arguments/0/left') === 1, 'arguments/0'), {
                content: 'assert(Float16Array.prototype.findIndex.length === 1)',
                filepath: 'test/Float16Array.js',
                line: 1129
            }));
        });
        it('check callback arguments', () => {
            const float16 = new Float16Array([1]);
            const thisArg = {};
            float16.findIndex(function (val, key, f16) {
                var _rec216 = new _PowerAssertRecorder1();
                var _rec217 = new _PowerAssertRecorder1();
                var _rec218 = new _PowerAssertRecorder1();
                var _rec219 = new _PowerAssertRecorder1();
                assert(_rec216._expr(_rec216._capt(_rec216._capt(val, 'arguments/0/left') === 1, 'arguments/0'), {
                    content: 'assert(val === 1)',
                    filepath: 'test/Float16Array.js',
                    line: 1137
                }));
                assert(_rec217._expr(_rec217._capt(_rec217._capt(key, 'arguments/0/left') === 0, 'arguments/0'), {
                    content: 'assert(key === 0)',
                    filepath: 'test/Float16Array.js',
                    line: 1138
                }));
                assert(_rec218._expr(_rec218._capt(_rec218._capt(f16, 'arguments/0/left') === _rec218._capt(float16, 'arguments/0/right'), 'arguments/0'), {
                    content: 'assert(f16 === float16)',
                    filepath: 'test/Float16Array.js',
                    line: 1139
                }));
                assert(_rec219._expr(_rec219._capt(this === _rec219._capt(thisArg, 'arguments/0/right'), 'arguments/0'), {
                    content: 'assert(this === thisArg)',
                    filepath: 'test/Float16Array.js',
                    line: 1140
                }));
            }, thisArg);
        });
        it('find index of even value', () => {
            var _rec220 = new _PowerAssertRecorder1();
            var _rec221 = new _PowerAssertRecorder1();
            const float16_1 = new Float16Array([
                1,
                2,
                3,
                4
            ]);
            assert(_rec220._expr(_rec220._capt(_rec220._capt(_rec220._capt(float16_1, 'arguments/0/left/callee/object').findIndex(val => val % 2 === 0), 'arguments/0/left') === 1, 'arguments/0'), {
                content: 'assert(float16_1.findIndex(val => val % 2 === 0) === 1)',
                filepath: 'test/Float16Array.js',
                line: 1146
            }));
            const float16_2 = new Float16Array([
                1,
                3,
                5
            ]);
            assert(_rec221._expr(_rec221._capt(_rec221._capt(_rec221._capt(float16_2, 'arguments/0/left/callee/object').findIndex(val => val % 2 === 0), 'arguments/0/left') === _rec221._capt(-1, 'arguments/0/right'), 'arguments/0'), {
                content: 'assert(float16_2.findIndex(val => val % 2 === 0) === -1)',
                filepath: 'test/Float16Array.js',
                line: 1149
            }));
        });
    });
    describe('#findLast()', () => {
        it('property `name` is \'findLast\'', () => {
            var _rec222 = new _PowerAssertRecorder1();
            assert(_rec222._expr(_rec222._capt(_rec222._capt(_rec222._capt(_rec222._capt(_rec222._capt(Float16Array, 'arguments/0/left/object/object/object').prototype, 'arguments/0/left/object/object').findLast, 'arguments/0/left/object').name, 'arguments/0/left') === 'findLast', 'arguments/0'), {
                content: 'assert(Float16Array.prototype.findLast.name === "findLast")',
                filepath: 'test/Float16Array.js',
                line: 1155
            }));
        });
        it('property `length` is 1', () => {
            var _rec223 = new _PowerAssertRecorder1();
            assert(_rec223._expr(_rec223._capt(_rec223._capt(_rec223._capt(_rec223._capt(_rec223._capt(Float16Array, 'arguments/0/left/object/object/object').prototype, 'arguments/0/left/object/object').findLast, 'arguments/0/left/object').length, 'arguments/0/left') === 1, 'arguments/0'), {
                content: 'assert(Float16Array.prototype.findLast.length === 1)',
                filepath: 'test/Float16Array.js',
                line: 1159
            }));
        });
        it('check callback arguments', () => {
            const float16 = new Float16Array([1]);
            const thisArg = {};
            float16.findLast(function (val, key, f16) {
                var _rec224 = new _PowerAssertRecorder1();
                var _rec225 = new _PowerAssertRecorder1();
                var _rec226 = new _PowerAssertRecorder1();
                var _rec227 = new _PowerAssertRecorder1();
                assert(_rec224._expr(_rec224._capt(_rec224._capt(val, 'arguments/0/left') === 1, 'arguments/0'), {
                    content: 'assert(val === 1)',
                    filepath: 'test/Float16Array.js',
                    line: 1167
                }));
                assert(_rec225._expr(_rec225._capt(_rec225._capt(key, 'arguments/0/left') === 0, 'arguments/0'), {
                    content: 'assert(key === 0)',
                    filepath: 'test/Float16Array.js',
                    line: 1168
                }));
                assert(_rec226._expr(_rec226._capt(_rec226._capt(f16, 'arguments/0/left') === _rec226._capt(float16, 'arguments/0/right'), 'arguments/0'), {
                    content: 'assert(f16 === float16)',
                    filepath: 'test/Float16Array.js',
                    line: 1169
                }));
                assert(_rec227._expr(_rec227._capt(this === _rec227._capt(thisArg, 'arguments/0/right'), 'arguments/0'), {
                    content: 'assert(this === thisArg)',
                    filepath: 'test/Float16Array.js',
                    line: 1170
                }));
            }, thisArg);
        });
        it('find even value from last', () => {
            var _rec228 = new _PowerAssertRecorder1();
            var _rec229 = new _PowerAssertRecorder1();
            const float16_1 = new Float16Array([
                1,
                2,
                3,
                4
            ]);
            assert(_rec228._expr(_rec228._capt(_rec228._capt(_rec228._capt(float16_1, 'arguments/0/left/callee/object').findLast(val => val % 2 === 0), 'arguments/0/left') === 4, 'arguments/0'), {
                content: 'assert(float16_1.findLast(val => val % 2 === 0) === 4)',
                filepath: 'test/Float16Array.js',
                line: 1176
            }));
            const float16_2 = new Float16Array([
                1,
                3,
                5
            ]);
            assert(_rec229._expr(_rec229._capt(_rec229._capt(_rec229._capt(float16_2, 'arguments/0/left/callee/object').findLast(val => val % 2 === 0), 'arguments/0/left') === _rec229._capt(undefined, 'arguments/0/right'), 'arguments/0'), {
                content: 'assert(float16_2.findLast(val => val % 2 === 0) === undefined)',
                filepath: 'test/Float16Array.js',
                line: 1179
            }));
        });
    });
    describe('#findLastIndex()', () => {
        it('property `name` is \'findLastIndex\'', () => {
            var _rec230 = new _PowerAssertRecorder1();
            assert(_rec230._expr(_rec230._capt(_rec230._capt(_rec230._capt(_rec230._capt(_rec230._capt(Float16Array, 'arguments/0/left/object/object/object').prototype, 'arguments/0/left/object/object').findLastIndex, 'arguments/0/left/object').name, 'arguments/0/left') === 'findLastIndex', 'arguments/0'), {
                content: 'assert(Float16Array.prototype.findLastIndex.name === "findLastIndex")',
                filepath: 'test/Float16Array.js',
                line: 1185
            }));
        });
        it('property `length` is 1', () => {
            var _rec231 = new _PowerAssertRecorder1();
            assert(_rec231._expr(_rec231._capt(_rec231._capt(_rec231._capt(_rec231._capt(_rec231._capt(Float16Array, 'arguments/0/left/object/object/object').prototype, 'arguments/0/left/object/object').findLastIndex, 'arguments/0/left/object').length, 'arguments/0/left') === 1, 'arguments/0'), {
                content: 'assert(Float16Array.prototype.findLastIndex.length === 1)',
                filepath: 'test/Float16Array.js',
                line: 1189
            }));
        });
        it('check callback arguments', () => {
            const float16 = new Float16Array([1]);
            const thisArg = {};
            float16.findLastIndex(function (val, key, f16) {
                var _rec232 = new _PowerAssertRecorder1();
                var _rec233 = new _PowerAssertRecorder1();
                var _rec234 = new _PowerAssertRecorder1();
                var _rec235 = new _PowerAssertRecorder1();
                assert(_rec232._expr(_rec232._capt(_rec232._capt(val, 'arguments/0/left') === 1, 'arguments/0'), {
                    content: 'assert(val === 1)',
                    filepath: 'test/Float16Array.js',
                    line: 1197
                }));
                assert(_rec233._expr(_rec233._capt(_rec233._capt(key, 'arguments/0/left') === 0, 'arguments/0'), {
                    content: 'assert(key === 0)',
                    filepath: 'test/Float16Array.js',
                    line: 1198
                }));
                assert(_rec234._expr(_rec234._capt(_rec234._capt(f16, 'arguments/0/left') === _rec234._capt(float16, 'arguments/0/right'), 'arguments/0'), {
                    content: 'assert(f16 === float16)',
                    filepath: 'test/Float16Array.js',
                    line: 1199
                }));
                assert(_rec235._expr(_rec235._capt(this === _rec235._capt(thisArg, 'arguments/0/right'), 'arguments/0'), {
                    content: 'assert(this === thisArg)',
                    filepath: 'test/Float16Array.js',
                    line: 1200
                }));
            }, thisArg);
        });
        it('find last index of even value', () => {
            var _rec236 = new _PowerAssertRecorder1();
            var _rec237 = new _PowerAssertRecorder1();
            const float16_1 = new Float16Array([
                1,
                2,
                3,
                4
            ]);
            assert(_rec236._expr(_rec236._capt(_rec236._capt(_rec236._capt(float16_1, 'arguments/0/left/callee/object').findLastIndex(val => val % 2 === 0), 'arguments/0/left') === 3, 'arguments/0'), {
                content: 'assert(float16_1.findLastIndex(val => val % 2 === 0) === 3)',
                filepath: 'test/Float16Array.js',
                line: 1206
            }));
            const float16_2 = new Float16Array([
                1,
                3,
                5
            ]);
            assert(_rec237._expr(_rec237._capt(_rec237._capt(_rec237._capt(float16_2, 'arguments/0/left/callee/object').findLastIndex(val => val % 2 === 0), 'arguments/0/left') === _rec237._capt(-1, 'arguments/0/right'), 'arguments/0'), {
                content: 'assert(float16_2.findLastIndex(val => val % 2 === 0) === -1)',
                filepath: 'test/Float16Array.js',
                line: 1209
            }));
        });
    });
    describe('#every()', () => {
        it('property `name` is \'every\'', () => {
            var _rec238 = new _PowerAssertRecorder1();
            assert(_rec238._expr(_rec238._capt(_rec238._capt(_rec238._capt(_rec238._capt(_rec238._capt(Float16Array, 'arguments/0/left/object/object/object').prototype, 'arguments/0/left/object/object').every, 'arguments/0/left/object').name, 'arguments/0/left') === 'every', 'arguments/0'), {
                content: 'assert(Float16Array.prototype.every.name === "every")',
                filepath: 'test/Float16Array.js',
                line: 1215
            }));
        });
        it('property `length` is 1', () => {
            var _rec239 = new _PowerAssertRecorder1();
            assert(_rec239._expr(_rec239._capt(_rec239._capt(_rec239._capt(_rec239._capt(_rec239._capt(Float16Array, 'arguments/0/left/object/object/object').prototype, 'arguments/0/left/object/object').every, 'arguments/0/left/object').length, 'arguments/0/left') === 1, 'arguments/0'), {
                content: 'assert(Float16Array.prototype.every.length === 1)',
                filepath: 'test/Float16Array.js',
                line: 1219
            }));
        });
        it('check callback arguments', () => {
            const float16 = new Float16Array([1]);
            const thisArg = {};
            float16.every(function (val, key, f16) {
                var _rec240 = new _PowerAssertRecorder1();
                var _rec241 = new _PowerAssertRecorder1();
                var _rec242 = new _PowerAssertRecorder1();
                var _rec243 = new _PowerAssertRecorder1();
                assert(_rec240._expr(_rec240._capt(_rec240._capt(val, 'arguments/0/left') === 1, 'arguments/0'), {
                    content: 'assert(val === 1)',
                    filepath: 'test/Float16Array.js',
                    line: 1227
                }));
                assert(_rec241._expr(_rec241._capt(_rec241._capt(key, 'arguments/0/left') === 0, 'arguments/0'), {
                    content: 'assert(key === 0)',
                    filepath: 'test/Float16Array.js',
                    line: 1228
                }));
                assert(_rec242._expr(_rec242._capt(_rec242._capt(f16, 'arguments/0/left') === _rec242._capt(float16, 'arguments/0/right'), 'arguments/0'), {
                    content: 'assert(f16 === float16)',
                    filepath: 'test/Float16Array.js',
                    line: 1229
                }));
                assert(_rec243._expr(_rec243._capt(this === _rec243._capt(thisArg, 'arguments/0/right'), 'arguments/0'), {
                    content: 'assert(this === thisArg)',
                    filepath: 'test/Float16Array.js',
                    line: 1230
                }));
            }, thisArg);
        });
        it('have all even value', () => {
            var _rec244 = new _PowerAssertRecorder1();
            var _rec245 = new _PowerAssertRecorder1();
            const float16_1 = new Float16Array([
                2,
                4,
                6
            ]);
            assert(_rec244._expr(_rec244._capt(_rec244._capt(_rec244._capt(float16_1, 'arguments/0/left/callee/object').every(val => val % 2 === 0), 'arguments/0/left') === true, 'arguments/0'), {
                content: 'assert(float16_1.every(val => val % 2 === 0) === true)',
                filepath: 'test/Float16Array.js',
                line: 1236
            }));
            const float16_2 = new Float16Array([
                2,
                4,
                7
            ]);
            assert(_rec245._expr(_rec245._capt(_rec245._capt(_rec245._capt(float16_2, 'arguments/0/left/callee/object').every(val => val % 2 === 0), 'arguments/0/left') === false, 'arguments/0'), {
                content: 'assert(float16_2.every(val => val % 2 === 0) === false)',
                filepath: 'test/Float16Array.js',
                line: 1239
            }));
        });
    });
    describe('#some()', () => {
        it('property `name` is \'some\'', () => {
            var _rec246 = new _PowerAssertRecorder1();
            assert(_rec246._expr(_rec246._capt(_rec246._capt(_rec246._capt(_rec246._capt(_rec246._capt(Float16Array, 'arguments/0/left/object/object/object').prototype, 'arguments/0/left/object/object').some, 'arguments/0/left/object').name, 'arguments/0/left') === 'some', 'arguments/0'), {
                content: 'assert(Float16Array.prototype.some.name === "some")',
                filepath: 'test/Float16Array.js',
                line: 1245
            }));
        });
        it('property `length` is 1', () => {
            var _rec247 = new _PowerAssertRecorder1();
            assert(_rec247._expr(_rec247._capt(_rec247._capt(_rec247._capt(_rec247._capt(_rec247._capt(Float16Array, 'arguments/0/left/object/object/object').prototype, 'arguments/0/left/object/object').some, 'arguments/0/left/object').length, 'arguments/0/left') === 1, 'arguments/0'), {
                content: 'assert(Float16Array.prototype.some.length === 1)',
                filepath: 'test/Float16Array.js',
                line: 1249
            }));
        });
        it('check callback arguments', () => {
            const float16 = new Float16Array([1]);
            const thisArg = {};
            float16.some(function (val, key, f16) {
                var _rec248 = new _PowerAssertRecorder1();
                var _rec249 = new _PowerAssertRecorder1();
                var _rec250 = new _PowerAssertRecorder1();
                var _rec251 = new _PowerAssertRecorder1();
                assert(_rec248._expr(_rec248._capt(_rec248._capt(val, 'arguments/0/left') === 1, 'arguments/0'), {
                    content: 'assert(val === 1)',
                    filepath: 'test/Float16Array.js',
                    line: 1257
                }));
                assert(_rec249._expr(_rec249._capt(_rec249._capt(key, 'arguments/0/left') === 0, 'arguments/0'), {
                    content: 'assert(key === 0)',
                    filepath: 'test/Float16Array.js',
                    line: 1258
                }));
                assert(_rec250._expr(_rec250._capt(_rec250._capt(f16, 'arguments/0/left') === _rec250._capt(float16, 'arguments/0/right'), 'arguments/0'), {
                    content: 'assert(f16 === float16)',
                    filepath: 'test/Float16Array.js',
                    line: 1259
                }));
                assert(_rec251._expr(_rec251._capt(this === _rec251._capt(thisArg, 'arguments/0/right'), 'arguments/0'), {
                    content: 'assert(this === thisArg)',
                    filepath: 'test/Float16Array.js',
                    line: 1260
                }));
            }, thisArg);
        });
        it('have some even value', () => {
            var _rec252 = new _PowerAssertRecorder1();
            var _rec253 = new _PowerAssertRecorder1();
            const float16_1 = new Float16Array([
                1,
                2,
                3
            ]);
            assert(_rec252._expr(_rec252._capt(_rec252._capt(_rec252._capt(float16_1, 'arguments/0/left/callee/object').some(val => val % 2 === 0), 'arguments/0/left') === true, 'arguments/0'), {
                content: 'assert(float16_1.some(val => val % 2 === 0) === true)',
                filepath: 'test/Float16Array.js',
                line: 1266
            }));
            const float16_2 = new Float16Array([
                1,
                3,
                5
            ]);
            assert(_rec253._expr(_rec253._capt(_rec253._capt(_rec253._capt(float16_2, 'arguments/0/left/callee/object').some(val => val % 2 === 0), 'arguments/0/left') === false, 'arguments/0'), {
                content: 'assert(float16_2.some(val => val % 2 === 0) === false)',
                filepath: 'test/Float16Array.js',
                line: 1269
            }));
        });
    });
    describe('#set()', () => {
        it('property `name` is \'set\'', () => {
            var _rec254 = new _PowerAssertRecorder1();
            assert(_rec254._expr(_rec254._capt(_rec254._capt(_rec254._capt(_rec254._capt(_rec254._capt(Float16Array, 'arguments/0/left/object/object/object').prototype, 'arguments/0/left/object/object').set, 'arguments/0/left/object').name, 'arguments/0/left') === 'set', 'arguments/0'), {
                content: 'assert(Float16Array.prototype.set.name === "set")',
                filepath: 'test/Float16Array.js',
                line: 1275
            }));
        });
        it('property `length` is 1', () => {
            var _rec255 = new _PowerAssertRecorder1();
            assert(_rec255._expr(_rec255._capt(_rec255._capt(_rec255._capt(_rec255._capt(_rec255._capt(Float16Array, 'arguments/0/left/object/object/object').prototype, 'arguments/0/left/object/object').set, 'arguments/0/left/object').length, 'arguments/0/left') === 1, 'arguments/0'), {
                content: 'assert(Float16Array.prototype.set.length === 1)',
                filepath: 'test/Float16Array.js',
                line: 1279
            }));
        });
        it('input empty or primitive', () => {
            assert.doesNotThrow(() => new Float16Array(4).set(0));
            assert.doesNotThrow(() => new Float16Array(4).set(4));
            assert.doesNotThrow(() => new Float16Array(4).set(-1));
            assert.doesNotThrow(() => new Float16Array(4).set(Symbol()));
            assert.throws(() => new Float16Array(4).set(), TypeError);
            assert.throws(() => new Float16Array(4).set(null), TypeError);
            assert.throws(() => new Float16Array(4).set(undefined), TypeError);
        });
        it('set Array or TypedArray', () => {
            var _rec256 = new _PowerAssertRecorder1();
            var _rec257 = new _PowerAssertRecorder1();
            const float16 = new Float16Array([
                1,
                2,
                3,
                4,
                5
            ]);
            const array = [
                10,
                11
            ];
            assert(_rec256._expr(_rec256._capt(_rec256._capt(_rec256._capt(float16, 'arguments/0/left/callee/object').set(_rec256._capt(array, 'arguments/0/left/arguments/0'), 2), 'arguments/0/left') === _rec256._capt(undefined, 'arguments/0/right'), 'arguments/0'), {
                content: 'assert(float16.set(array, 2) === undefined)',
                filepath: 'test/Float16Array.js',
                line: 1297
            }));
            assert.equalFloat16ArrayValues(float16, [
                1,
                2,
                10,
                11,
                5
            ]);
            const float32 = new Float32Array([
                20,
                21
            ]);
            assert(_rec257._expr(_rec257._capt(_rec257._capt(_rec257._capt(float16, 'arguments/0/left/callee/object').set(_rec257._capt(float32, 'arguments/0/left/arguments/0'), 1), 'arguments/0/left') === _rec257._capt(undefined, 'arguments/0/right'), 'arguments/0'), {
                content: 'assert(float16.set(float32, 1) === undefined)',
                filepath: 'test/Float16Array.js',
                line: 1302
            }));
            assert.equalFloat16ArrayValues(float16, [
                1,
                20,
                21,
                11,
                5
            ]);
        });
        it('set BigInt TypedArray', function () {
            if (typeof BigUint64Array === 'undefined') {
                this.skip();
            }
            const float16 = new Float16Array([
                1,
                2,
                3,
                4,
                5
            ]);
            assert.throws(() => float16.set(new BigUint64Array()), TypeError);
        });
        it('set TypedArray with detached ArrayBuffer', function () {
            if (detach === undefined) {
                this.skip();
            }
            const float16 = new Float16Array(4);
            const float32 = new Float32Array(2);
            detach(float32.buffer);
            assert.throws(() => float16.set(float32, 0), TypeError);
        });
        it('set ArrayLike', () => {
            var _rec258 = new _PowerAssertRecorder1();
            var _rec259 = new _PowerAssertRecorder1();
            const float16 = new Float16Array([
                1,
                2,
                3,
                4,
                5
            ]);
            const arrayLike = {
                0: 10,
                1: 11,
                length: 2
            };
            assert(_rec258._expr(_rec258._capt(_rec258._capt(_rec258._capt(float16, 'arguments/0/left/callee/object').set(_rec258._capt(arrayLike, 'arguments/0/left/arguments/0'), 2), 'arguments/0/left') === _rec258._capt(undefined, 'arguments/0/right'), 'arguments/0'), {
                content: 'assert(float16.set(arrayLike, 2) === undefined)',
                filepath: 'test/Float16Array.js',
                line: 1333
            }));
            assert.equalFloat16ArrayValues(float16, [
                1,
                2,
                10,
                11,
                5
            ]);
            const str = '89';
            assert(_rec259._expr(_rec259._capt(_rec259._capt(_rec259._capt(float16, 'arguments/0/left/callee/object').set(_rec259._capt(str, 'arguments/0/left/arguments/0'), 1), 'arguments/0/left') === _rec259._capt(undefined, 'arguments/0/right'), 'arguments/0'), {
                content: 'assert(float16.set(str, 1) === undefined)',
                filepath: 'test/Float16Array.js',
                line: 1337
            }));
            assert.equalFloat16ArrayValues(float16, [
                1,
                8,
                9,
                11,
                5
            ]);
        });
        it('set Iterable (no effect)', () => {
            var _rec260 = new _PowerAssertRecorder1();
            const float16 = new Float16Array([
                1,
                2,
                3,
                4,
                5
            ]);
            const Iterable = [
                10,
                11
            ][Symbol.iterator]();
            assert(_rec260._expr(_rec260._capt(_rec260._capt(_rec260._capt(float16, 'arguments/0/left/callee/object').set(_rec260._capt(Iterable, 'arguments/0/left/arguments/0'), 2), 'arguments/0/left') === _rec260._capt(undefined, 'arguments/0/right'), 'arguments/0'), {
                content: 'assert(float16.set(Iterable, 2) === undefined)',
                filepath: 'test/Float16Array.js',
                line: 1345
            }));
            assert.equalFloat16ArrayValues(float16, [
                1,
                2,
                3,
                4,
                5
            ]);
        });
        it('set Float16Array', () => {
            var _rec261 = new _PowerAssertRecorder1();
            const float16 = new Float16Array([
                1,
                2,
                3,
                4,
                5
            ]);
            const array = [
                10,
                11
            ];
            assert(_rec261._expr(_rec261._capt(_rec261._capt(_rec261._capt(float16, 'arguments/0/left/callee/object').set(_rec261._capt(new Float16Array(_rec261._capt(array, 'arguments/0/left/arguments/0/arguments/0')), 'arguments/0/left/arguments/0'), 2), 'arguments/0/left') === _rec261._capt(undefined, 'arguments/0/right'), 'arguments/0'), {
                content: 'assert(float16.set(new Float16Array(array), 2) === undefined)',
                filepath: 'test/Float16Array.js',
                line: 1353
            }));
            assert.equalFloat16ArrayValues(float16, [
                1,
                2,
                10,
                11,
                5
            ]);
        });
        it('set Float16Array from another realm', function () {
            var _rec262 = new _PowerAssertRecorder1();
            if (AnotherRealmFloat16Array === undefined) {
                this.skip();
            }
            const float16 = new Float16Array([
                1,
                2,
                3,
                4,
                5
            ]);
            const array = [
                10,
                11
            ];
            assert(_rec262._expr(_rec262._capt(_rec262._capt(_rec262._capt(float16, 'arguments/0/left/callee/object').set(_rec262._capt(new AnotherRealmFloat16Array(_rec262._capt(array, 'arguments/0/left/arguments/0/arguments/0')), 'arguments/0/left/arguments/0'), 2), 'arguments/0/left') === _rec262._capt(undefined, 'arguments/0/right'), 'arguments/0'), {
                content: 'assert(float16.set(new AnotherRealmFloat16Array(array), 2) === undefined)',
                filepath: 'test/Float16Array.js',
                line: 1365
            }));
            assert.equalFloat16ArrayValues(float16, [
                1,
                2,
                10,
                11,
                5
            ]);
        });
        it('set TypedArray with detached ArrayBuffer', function () {
            if (detach === undefined) {
                this.skip();
            }
            const float16 = new Float16Array(4);
            const float16_2 = new Float16Array(2);
            detach(float16_2.buffer);
            assert.throws(() => float16.set(float16_2, 0), TypeError);
        });
        it('check out of Range', () => {
            const float16 = new Float16Array([
                1,
                2,
                3,
                4,
                5
            ]);
            const array = [
                10,
                11
            ];
            assert.throws(() => float16.set(array, -1), RangeError);
            assert.throws(() => float16.set(array, 4), RangeError);
            assert.throws(() => float16.set(array, Infinity), RangeError);
        });
    });
    describe('#reverse()', () => {
        it('property `name` is \'reverse\'', () => {
            var _rec263 = new _PowerAssertRecorder1();
            assert(_rec263._expr(_rec263._capt(_rec263._capt(_rec263._capt(_rec263._capt(_rec263._capt(Float16Array, 'arguments/0/left/object/object/object').prototype, 'arguments/0/left/object/object').reverse, 'arguments/0/left/object').name, 'arguments/0/left') === 'reverse', 'arguments/0'), {
                content: 'assert(Float16Array.prototype.reverse.name === "reverse")',
                filepath: 'test/Float16Array.js',
                line: 1394
            }));
        });
        it('property `length` is 0', () => {
            var _rec264 = new _PowerAssertRecorder1();
            assert(_rec264._expr(_rec264._capt(_rec264._capt(_rec264._capt(_rec264._capt(_rec264._capt(Float16Array, 'arguments/0/left/object/object/object').prototype, 'arguments/0/left/object/object').reverse, 'arguments/0/left/object').length, 'arguments/0/left') === 0, 'arguments/0'), {
                content: 'assert(Float16Array.prototype.reverse.length === 0)',
                filepath: 'test/Float16Array.js',
                line: 1398
            }));
        });
        it('reverse', () => {
            var _rec265 = new _PowerAssertRecorder1();
            const float16 = new Float16Array([
                1,
                2,
                3
            ]);
            assert(_rec265._expr(_rec265._capt(_rec265._capt(_rec265._capt(float16, 'arguments/0/left/callee/object').reverse(), 'arguments/0/left') === _rec265._capt(float16, 'arguments/0/right'), 'arguments/0'), {
                content: 'assert(float16.reverse() === float16)',
                filepath: 'test/Float16Array.js',
                line: 1404
            }));
            assert.equalFloat16ArrayValues(float16, [
                3,
                2,
                1
            ]);
        });
    });
    describe('#fill()', () => {
        it('property `name` is \'fill\'', () => {
            var _rec266 = new _PowerAssertRecorder1();
            assert(_rec266._expr(_rec266._capt(_rec266._capt(_rec266._capt(_rec266._capt(_rec266._capt(Float16Array, 'arguments/0/left/object/object/object').prototype, 'arguments/0/left/object/object').fill, 'arguments/0/left/object').name, 'arguments/0/left') === 'fill', 'arguments/0'), {
                content: 'assert(Float16Array.prototype.fill.name === "fill")',
                filepath: 'test/Float16Array.js',
                line: 1411
            }));
        });
        it('property `length` is 1', () => {
            var _rec267 = new _PowerAssertRecorder1();
            assert(_rec267._expr(_rec267._capt(_rec267._capt(_rec267._capt(_rec267._capt(_rec267._capt(Float16Array, 'arguments/0/left/object/object/object').prototype, 'arguments/0/left/object/object').fill, 'arguments/0/left/object').length, 'arguments/0/left') === 1, 'arguments/0'), {
                content: 'assert(Float16Array.prototype.fill.length === 1)',
                filepath: 'test/Float16Array.js',
                line: 1415
            }));
        });
        it('fill', () => {
            var _rec268 = new _PowerAssertRecorder1();
            const float16 = new Float16Array(5);
            assert(_rec268._expr(_rec268._capt(_rec268._capt(_rec268._capt(float16, 'arguments/0/left/callee/object').fill(1, 1, 4), 'arguments/0/left') === _rec268._capt(float16, 'arguments/0/right'), 'arguments/0'), {
                content: 'assert(float16.fill(1, 1, 4) === float16)',
                filepath: 'test/Float16Array.js',
                line: 1421
            }));
            assert.equalFloat16ArrayValues(float16, [
                0,
                1,
                1,
                1,
                0
            ]);
        });
    });
    describe('#copyWithin()', () => {
        it('property `name` is \'copyWithin\'', () => {
            var _rec269 = new _PowerAssertRecorder1();
            assert(_rec269._expr(_rec269._capt(_rec269._capt(_rec269._capt(_rec269._capt(_rec269._capt(Float16Array, 'arguments/0/left/object/object/object').prototype, 'arguments/0/left/object/object').copyWithin, 'arguments/0/left/object').name, 'arguments/0/left') === 'copyWithin', 'arguments/0'), {
                content: 'assert(Float16Array.prototype.copyWithin.name === "copyWithin")',
                filepath: 'test/Float16Array.js',
                line: 1428
            }));
        });
        it('property `length` is 2', () => {
            var _rec270 = new _PowerAssertRecorder1();
            assert(_rec270._expr(_rec270._capt(_rec270._capt(_rec270._capt(_rec270._capt(_rec270._capt(Float16Array, 'arguments/0/left/object/object/object').prototype, 'arguments/0/left/object/object').copyWithin, 'arguments/0/left/object').length, 'arguments/0/left') === 2, 'arguments/0'), {
                content: 'assert(Float16Array.prototype.copyWithin.length === 2)',
                filepath: 'test/Float16Array.js',
                line: 1432
            }));
        });
        it('copyWitnin', () => {
            var _rec271 = new _PowerAssertRecorder1();
            const float16 = new Float16Array([
                1,
                2,
                0,
                0,
                0
            ]);
            assert(_rec271._expr(_rec271._capt(_rec271._capt(_rec271._capt(float16, 'arguments/0/left/callee/object').copyWithin(2, 0, 2), 'arguments/0/left') === _rec271._capt(float16, 'arguments/0/right'), 'arguments/0'), {
                content: 'assert(float16.copyWithin(2, 0, 2) === float16)',
                filepath: 'test/Float16Array.js',
                line: 1438
            }));
            assert.equalFloat16ArrayValues(float16, [
                1,
                2,
                1,
                2,
                0
            ]);
        });
    });
    describe('#sort()', () => {
        it('property `name` is \'sort\'', () => {
            var _rec272 = new _PowerAssertRecorder1();
            assert(_rec272._expr(_rec272._capt(_rec272._capt(_rec272._capt(_rec272._capt(_rec272._capt(Float16Array, 'arguments/0/left/object/object/object').prototype, 'arguments/0/left/object/object').sort, 'arguments/0/left/object').name, 'arguments/0/left') === 'sort', 'arguments/0'), {
                content: 'assert(Float16Array.prototype.sort.name === "sort")',
                filepath: 'test/Float16Array.js',
                line: 1445
            }));
        });
        it('property `length` is 0', () => {
            var _rec273 = new _PowerAssertRecorder1();
            assert(_rec273._expr(_rec273._capt(_rec273._capt(_rec273._capt(_rec273._capt(_rec273._capt(Float16Array, 'arguments/0/left/object/object/object').prototype, 'arguments/0/left/object/object').sort, 'arguments/0/left/object').length, 'arguments/0/left') === 0, 'arguments/0'), {
                content: 'assert(Float16Array.prototype.sort.length === 0)',
                filepath: 'test/Float16Array.js',
                line: 1449
            }));
        });
        it('check default compare', () => {
            var _rec274 = new _PowerAssertRecorder1();
            const float16 = new Float16Array([
                1,
                2,
                -1,
                -2,
                0,
                -0,
                NaN,
                Infinity,
                -Infinity
            ]);
            assert(_rec274._expr(_rec274._capt(_rec274._capt(_rec274._capt(float16, 'arguments/0/left/callee/object').sort(), 'arguments/0/left') === _rec274._capt(float16, 'arguments/0/right'), 'arguments/0'), {
                content: 'assert(float16.sort() === float16)',
                filepath: 'test/Float16Array.js',
                line: 1465
            }));
            assert.equalFloat16ArrayValues(float16, [
                -Infinity,
                -2,
                -1,
                -0,
                0,
                1,
                2,
                Infinity,
                NaN
            ]);
        });
        it('check custom compare', () => {
            var _rec275 = new _PowerAssertRecorder1();
            const float16 = new Float16Array([
                1,
                2,
                -1,
                -2,
                Infinity,
                -Infinity
            ]);
            assert(_rec275._expr(_rec275._capt(_rec275._capt(_rec275._capt(float16, 'arguments/0/left/callee/object').sort((x, y) => x - y), 'arguments/0/left') === _rec275._capt(float16, 'arguments/0/right'), 'arguments/0'), {
                content: 'assert(float16.sort((x, y) => x - y) === float16)',
                filepath: 'test/Float16Array.js',
                line: 1482
            }));
            assert.equalFloat16ArrayValues(float16, [
                -Infinity,
                -2,
                -1,
                1,
                2,
                Infinity
            ]);
        });
    });
    describe('#slice()', () => {
        it('property `name` is \'slice\'', () => {
            var _rec276 = new _PowerAssertRecorder1();
            assert(_rec276._expr(_rec276._capt(_rec276._capt(_rec276._capt(_rec276._capt(_rec276._capt(Float16Array, 'arguments/0/left/object/object/object').prototype, 'arguments/0/left/object/object').slice, 'arguments/0/left/object').name, 'arguments/0/left') === 'slice', 'arguments/0'), {
                content: 'assert(Float16Array.prototype.slice.name === "slice")',
                filepath: 'test/Float16Array.js',
                line: 1496
            }));
        });
        it('property `length` is 0', () => {
            var _rec277 = new _PowerAssertRecorder1();
            assert(_rec277._expr(_rec277._capt(_rec277._capt(_rec277._capt(_rec277._capt(_rec277._capt(Float16Array, 'arguments/0/left/object/object/object').prototype, 'arguments/0/left/object/object').slice, 'arguments/0/left/object').length, 'arguments/0/left') === 0, 'arguments/0'), {
                content: 'assert(Float16Array.prototype.slice.length === 0)',
                filepath: 'test/Float16Array.js',
                line: 1500
            }));
        });
        it('get slice', () => {
            var _rec278 = new _PowerAssertRecorder1();
            var _rec279 = new _PowerAssertRecorder1();
            const float16 = new Float16Array([
                1,
                2,
                3
            ]);
            const sliced = float16.slice();
            assert(_rec278._expr(_rec278._capt(_rec278._capt(sliced, 'arguments/0/left') instanceof _rec278._capt(Float16Array, 'arguments/0/right'), 'arguments/0'), {
                content: 'assert(sliced instanceof Float16Array)',
                filepath: 'test/Float16Array.js',
                line: 1507
            }));
            assert.equalFloat16ArrayValues(float16, sliced);
            assert(_rec279._expr(_rec279._capt(_rec279._capt(_rec279._capt(float16, 'arguments/0/left/object').buffer, 'arguments/0/left') !== _rec279._capt(_rec279._capt(sliced, 'arguments/0/right/object').buffer, 'arguments/0/right'), 'arguments/0'), {
                content: 'assert(float16.buffer !== sliced.buffer)',
                filepath: 'test/Float16Array.js',
                line: 1509
            }));
        });
        it('check sliced element & offset', () => {
            var _rec280 = new _PowerAssertRecorder1();
            const float16 = new Float16Array([
                1,
                2,
                3,
                4
            ]);
            const sliced = float16.slice(1, 3);
            assert(_rec280._expr(_rec280._capt(_rec280._capt(_rec280._capt(sliced, 'arguments/0/left/object').byteOffset, 'arguments/0/left') === 0, 'arguments/0'), {
                content: 'assert(sliced.byteOffset === 0)',
                filepath: 'test/Float16Array.js',
                line: 1516
            }));
            assert.equalFloat16ArrayValues(sliced, [
                2,
                3
            ]);
        });
        it('respect @@species', () => {
            var _rec286 = new _PowerAssertRecorder1();
            var _rec287 = new _PowerAssertRecorder1();
            var _rec288 = new _PowerAssertRecorder1();
            var _rec289 = new _PowerAssertRecorder1();
            let step = 0;
            class Foo extends Float16Array {
                constructor(...args) {
                    var _rec281 = new _PowerAssertRecorder1();
                    var _rec282 = new _PowerAssertRecorder1();
                    var _rec283 = new _PowerAssertRecorder1();
                    var _rec284 = new _PowerAssertRecorder1();
                    var _rec285 = new _PowerAssertRecorder1();
                    super(...args);
                    if (step === 0) {
                        assert(_rec281._expr(_rec281._capt(_rec281._capt(_rec281._capt(args, 'arguments/0/left/object').length, 'arguments/0/left') === 1, 'arguments/0'), {
                            content: 'assert(args.length === 1)',
                            filepath: 'test/Float16Array.js',
                            line: 1526
                        }));
                        assert.deepStrictEqual(_rec282._expr(_rec282._capt(_rec282._capt(args, 'arguments/0/object')[0], 'arguments/0'), {
                            content: 'assert.deepStrictEqual(args[0], [1,2,3,4])',
                            filepath: 'test/Float16Array.js',
                            line: 1527
                        }), _rec283._expr(_rec283._capt([
                            1,
                            2,
                            3,
                            4
                        ], 'arguments/1'), {
                            content: 'assert.deepStrictEqual(args[0], [1,2,3,4])',
                            filepath: 'test/Float16Array.js',
                            line: 1527
                        }));
                        ++step;
                    } else {
                        assert.deepStrictEqual(_rec284._expr(_rec284._capt(args, 'arguments/0'), {
                            content: 'assert.deepStrictEqual(args, [2])',
                            filepath: 'test/Float16Array.js',
                            line: 1530
                        }), _rec285._expr(_rec285._capt([2], 'arguments/1'), {
                            content: 'assert.deepStrictEqual(args, [2])',
                            filepath: 'test/Float16Array.js',
                            line: 1530
                        }));
                    }
                }
            }
            const foo = new Foo([
                1,
                2,
                3,
                4
            ]).slice(2);
            assert(_rec286._expr(_rec286._capt(_rec286._capt(foo, 'arguments/0/left') instanceof _rec286._capt(Foo, 'arguments/0/right'), 'arguments/0'), {
                content: 'assert(foo instanceof Foo)',
                filepath: 'test/Float16Array.js',
                line: 1535
            }));
            assert.equalFloat16ArrayValues(foo, [
                3,
                4
            ]);
            class Bar extends Float16Array {
                static get [Symbol.species]() {
                    return Float16Array;
                }
            }
            const bar = new Bar([
                1,
                2,
                3,
                4
            ]).slice(2);
            assert(_rec287._expr(_rec287._capt(!_rec287._capt(_rec287._capt(bar, 'arguments/0/argument/left') instanceof _rec287._capt(Bar, 'arguments/0/argument/right'), 'arguments/0/argument'), 'arguments/0'), {
                content: 'assert(!(bar instanceof Bar))',
                filepath: 'test/Float16Array.js',
                line: 1544
            }));
            assert(_rec288._expr(_rec288._capt(_rec288._capt(bar, 'arguments/0/left') instanceof _rec288._capt(Float16Array, 'arguments/0/right'), 'arguments/0'), {
                content: 'assert(bar instanceof Float16Array)',
                filepath: 'test/Float16Array.js',
                line: 1545
            }));
            assert(_rec289._expr(_rec289._capt(bar, 'arguments/0'), {
                content: 'assert(bar, [3,4])',
                filepath: 'test/Float16Array.js',
                line: 1546
            }), [
                3,
                4
            ]);
        });
        it('SpeciesConstructor must return a TypedArray of the same Content Type', function () {
            class Foo extends Float16Array {
                static get [Symbol.species]() {
                    return Array;
                }
            }
            const foo = new Foo([
                1,
                2,
                3,
                4
            ]);
            assert.throws(() => foo.slice(0, 1), TypeError);
            if (typeof BigUint64Array !== 'undefined') {
                class Bar extends Float16Array {
                    static get [Symbol.species]() {
                        return BigUint64Array;
                    }
                }
                const bar = new Bar([
                    1,
                    2,
                    3,
                    4
                ]);
                assert.throws(() => bar.slice(0, 1), TypeError);
            }
        });
        it('Constructor created TypedArray which was too small', function () {
            class Foo extends Float16Array {
                constructor(...args) {
                    if (typeof args[0] === 'number') {
                        super(args[0] / 2, ...args.slice(1));
                    } else {
                        super(...args);
                    }
                }
            }
            const foo = new Foo([
                1,
                2,
                3,
                4
            ]);
            assert.throws(() => foo.slice(), TypeError);
        });
        class Bar extends Float16Array {
            static get [Symbol.species]() {
                return Baz;
            }
        }
        class Baz extends Uint16Array {
            constructor(...args) {
                if (typeof args[0] === 'number') {
                    super(args[0] / 2, ...args.slice(1));
                } else {
                    super(...args);
                }
            }
        }
        const bar = new Bar([
            1,
            2,
            3,
            4
        ]);
        assert.throws(() => bar.slice(), TypeError);
    });
    describe('#subarray()', () => {
        it('property `name` is \'subarray\'', () => {
            var _rec290 = new _PowerAssertRecorder1();
            assert(_rec290._expr(_rec290._capt(_rec290._capt(_rec290._capt(_rec290._capt(_rec290._capt(Float16Array, 'arguments/0/left/object/object/object').prototype, 'arguments/0/left/object/object').subarray, 'arguments/0/left/object').name, 'arguments/0/left') === 'subarray', 'arguments/0'), {
                content: 'assert(Float16Array.prototype.subarray.name === "subarray")',
                filepath: 'test/Float16Array.js',
                line: 1603
            }));
        });
        it('property `length` is 0', () => {
            var _rec291 = new _PowerAssertRecorder1();
            assert(_rec291._expr(_rec291._capt(_rec291._capt(_rec291._capt(_rec291._capt(_rec291._capt(Float16Array, 'arguments/0/left/object/object/object').prototype, 'arguments/0/left/object/object').subarray, 'arguments/0/left/object').length, 'arguments/0/left') === 0, 'arguments/0'), {
                content: 'assert(Float16Array.prototype.subarray.length === 0)',
                filepath: 'test/Float16Array.js',
                line: 1607
            }));
        });
        it('get subarray', () => {
            var _rec292 = new _PowerAssertRecorder1();
            var _rec293 = new _PowerAssertRecorder1();
            const float16 = new Float16Array([
                1,
                2,
                3
            ]);
            const subarray = float16.subarray();
            assert(_rec292._expr(_rec292._capt(_rec292._capt(subarray, 'arguments/0/left') instanceof _rec292._capt(Float16Array, 'arguments/0/right'), 'arguments/0'), {
                content: 'assert(subarray instanceof Float16Array)',
                filepath: 'test/Float16Array.js',
                line: 1614
            }));
            assert.equalFloat16ArrayValues(float16, subarray);
            assert(_rec293._expr(_rec293._capt(_rec293._capt(_rec293._capt(float16, 'arguments/0/left/object').buffer, 'arguments/0/left') === _rec293._capt(_rec293._capt(subarray, 'arguments/0/right/object').buffer, 'arguments/0/right'), 'arguments/0'), {
                content: 'assert(float16.buffer === subarray.buffer)',
                filepath: 'test/Float16Array.js',
                line: 1616
            }));
        });
        it('check subarray element & offset', () => {
            var _rec294 = new _PowerAssertRecorder1();
            const float16 = new Float16Array([
                1,
                2,
                3,
                4
            ]);
            const subarray = float16.subarray(1, 3);
            assert(_rec294._expr(_rec294._capt(_rec294._capt(_rec294._capt(subarray, 'arguments/0/left/object').byteOffset, 'arguments/0/left') === 2, 'arguments/0'), {
                content: 'assert(subarray.byteOffset === 2)',
                filepath: 'test/Float16Array.js',
                line: 1623
            }));
            assert.equalFloat16ArrayValues(subarray, [
                2,
                3
            ]);
        });
        it('respect @@species', () => {
            var _rec302 = new _PowerAssertRecorder1();
            var _rec303 = new _PowerAssertRecorder1();
            var _rec304 = new _PowerAssertRecorder1();
            let step = 0;
            class Foo extends Float16Array {
                constructor(...args) {
                    var _rec295 = new _PowerAssertRecorder1();
                    var _rec296 = new _PowerAssertRecorder1();
                    var _rec297 = new _PowerAssertRecorder1();
                    var _rec298 = new _PowerAssertRecorder1();
                    var _rec299 = new _PowerAssertRecorder1();
                    var _rec300 = new _PowerAssertRecorder1();
                    var _rec301 = new _PowerAssertRecorder1();
                    super(...args);
                    if (step === 0) {
                        assert(_rec295._expr(_rec295._capt(_rec295._capt(_rec295._capt(args, 'arguments/0/left/object').length, 'arguments/0/left') === 1, 'arguments/0'), {
                            content: 'assert(args.length === 1)',
                            filepath: 'test/Float16Array.js',
                            line: 1633
                        }));
                        assert.deepStrictEqual(_rec296._expr(_rec296._capt(_rec296._capt(args, 'arguments/0/object')[0], 'arguments/0'), {
                            content: 'assert.deepStrictEqual(args[0], [1,2,3,4])',
                            filepath: 'test/Float16Array.js',
                            line: 1634
                        }), _rec297._expr(_rec297._capt([
                            1,
                            2,
                            3,
                            4
                        ], 'arguments/1'), {
                            content: 'assert.deepStrictEqual(args[0], [1,2,3,4])',
                            filepath: 'test/Float16Array.js',
                            line: 1634
                        }));
                        ++step;
                    } else {
                        assert(_rec298._expr(_rec298._capt(_rec298._capt(_rec298._capt(args, 'arguments/0/left/object').length, 'arguments/0/left') === 3, 'arguments/0'), {
                            content: 'assert(args.length === 3)',
                            filepath: 'test/Float16Array.js',
                            line: 1637
                        }));
                        assert(_rec299._expr(_rec299._capt(_rec299._capt(_rec299._capt(args, 'arguments/0/left/object')[0], 'arguments/0/left') instanceof _rec299._capt(ArrayBuffer, 'arguments/0/right'), 'arguments/0'), {
                            content: 'assert(args[0] instanceof ArrayBuffer)',
                            filepath: 'test/Float16Array.js',
                            line: 1638
                        }));
                        assert(_rec300._expr(_rec300._capt(_rec300._capt(_rec300._capt(args, 'arguments/0/left/object')[1], 'arguments/0/left') === 4, 'arguments/0'), {
                            content: 'assert(args[1] === 4)',
                            filepath: 'test/Float16Array.js',
                            line: 1639
                        }));
                        assert(_rec301._expr(_rec301._capt(_rec301._capt(_rec301._capt(args, 'arguments/0/left/object')[2], 'arguments/0/left') === 2, 'arguments/0'), {
                            content: 'assert(args[2] === 2)',
                            filepath: 'test/Float16Array.js',
                            line: 1640
                        }));
                    }
                }
            }
            const foo = new Foo([
                1,
                2,
                3,
                4
            ]).subarray(2);
            assert(_rec302._expr(_rec302._capt(_rec302._capt(foo, 'arguments/0/left') instanceof _rec302._capt(Foo, 'arguments/0/right'), 'arguments/0'), {
                content: 'assert(foo instanceof Foo)',
                filepath: 'test/Float16Array.js',
                line: 1645
            }));
            assert.equalFloat16ArrayValues(foo, [
                3,
                4
            ]);
            class Bar extends Float16Array {
                static get [Symbol.species]() {
                    return Float16Array;
                }
            }
            const bar = new Bar([
                1,
                2,
                3,
                4
            ]).subarray(2);
            assert(_rec303._expr(_rec303._capt(!_rec303._capt(_rec303._capt(bar, 'arguments/0/argument/left') instanceof _rec303._capt(Bar, 'arguments/0/argument/right'), 'arguments/0/argument'), 'arguments/0'), {
                content: 'assert(!(bar instanceof Bar))',
                filepath: 'test/Float16Array.js',
                line: 1654
            }));
            assert(_rec304._expr(_rec304._capt(_rec304._capt(bar, 'arguments/0/left') instanceof _rec304._capt(Float16Array, 'arguments/0/right'), 'arguments/0'), {
                content: 'assert(bar instanceof Float16Array)',
                filepath: 'test/Float16Array.js',
                line: 1655
            }));
            assert.equalFloat16ArrayValues(bar, [
                3,
                4
            ]);
        });
        it('SpeciesConstructor must return a TypedArray of the same Content Type', function () {
            class Foo extends Float16Array {
                static get [Symbol.species]() {
                    return Array;
                }
            }
            const foo = new Foo([
                1,
                2,
                3,
                4
            ]);
            assert.throws(() => foo.subarray(0, 1), TypeError);
            if (typeof BigUint64Array !== 'undefined') {
                class Bar extends Float16Array {
                    static get [Symbol.species]() {
                        return BigUint64Array;
                    }
                }
                const bar = new Bar([
                    1,
                    2,
                    3,
                    4
                ]);
                assert.throws(() => bar.subarray(0, 1), TypeError);
            }
        });
    });
    describe('#indexOf()', () => {
        it('property `name` is \'indexOf\'', () => {
            var _rec305 = new _PowerAssertRecorder1();
            assert(_rec305._expr(_rec305._capt(_rec305._capt(_rec305._capt(_rec305._capt(_rec305._capt(Float16Array, 'arguments/0/left/object/object/object').prototype, 'arguments/0/left/object/object').indexOf, 'arguments/0/left/object').name, 'arguments/0/left') === 'indexOf', 'arguments/0'), {
                content: 'assert(Float16Array.prototype.indexOf.name === "indexOf")',
                filepath: 'test/Float16Array.js',
                line: 1682
            }));
        });
        it('property `length` is 1', () => {
            var _rec306 = new _PowerAssertRecorder1();
            assert(_rec306._expr(_rec306._capt(_rec306._capt(_rec306._capt(_rec306._capt(_rec306._capt(Float16Array, 'arguments/0/left/object/object/object').prototype, 'arguments/0/left/object/object').indexOf, 'arguments/0/left/object').length, 'arguments/0/left') === 1, 'arguments/0'), {
                content: 'assert(Float16Array.prototype.indexOf.length === 1)',
                filepath: 'test/Float16Array.js',
                line: 1686
            }));
        });
        it('check indexOf', () => {
            var _rec307 = new _PowerAssertRecorder1();
            var _rec308 = new _PowerAssertRecorder1();
            var _rec309 = new _PowerAssertRecorder1();
            var _rec310 = new _PowerAssertRecorder1();
            var _rec311 = new _PowerAssertRecorder1();
            const float16 = new Float16Array([
                1,
                2,
                3
            ]);
            assert(_rec307._expr(_rec307._capt(_rec307._capt(_rec307._capt(float16, 'arguments/0/left/callee/object').indexOf(1), 'arguments/0/left') === 0, 'arguments/0'), {
                content: 'assert(float16.indexOf(1) === 0)',
                filepath: 'test/Float16Array.js',
                line: 1692
            }));
            assert(_rec308._expr(_rec308._capt(_rec308._capt(_rec308._capt(float16, 'arguments/0/left/callee/object').indexOf(1, 1), 'arguments/0/left') === _rec308._capt(-1, 'arguments/0/right'), 'arguments/0'), {
                content: 'assert(float16.indexOf(1, 1) === -1)',
                filepath: 'test/Float16Array.js',
                line: 1693
            }));
            assert(_rec309._expr(_rec309._capt(_rec309._capt(_rec309._capt(float16, 'arguments/0/left/callee/object').indexOf(2, 1), 'arguments/0/left') === 1, 'arguments/0'), {
                content: 'assert(float16.indexOf(2, 1) === 1)',
                filepath: 'test/Float16Array.js',
                line: 1694
            }));
            assert(_rec310._expr(_rec310._capt(_rec310._capt(_rec310._capt(float16, 'arguments/0/left/callee/object').indexOf(2, _rec310._capt(-1, 'arguments/0/left/arguments/1')), 'arguments/0/left') === _rec310._capt(-1, 'arguments/0/right'), 'arguments/0'), {
                content: 'assert(float16.indexOf(2, -1) === -1)',
                filepath: 'test/Float16Array.js',
                line: 1695
            }));
            assert(_rec311._expr(_rec311._capt(_rec311._capt(_rec311._capt(float16, 'arguments/0/left/callee/object').indexOf(2, _rec311._capt(-2, 'arguments/0/left/arguments/1')), 'arguments/0/left') === 1, 'arguments/0'), {
                content: 'assert(float16.indexOf(2, -2) === 1)',
                filepath: 'test/Float16Array.js',
                line: 1696
            }));
        });
    });
    describe('#lastIndexOf()', () => {
        it('property `name` is \'lastIndexOf\'', () => {
            var _rec312 = new _PowerAssertRecorder1();
            assert(_rec312._expr(_rec312._capt(_rec312._capt(_rec312._capt(_rec312._capt(_rec312._capt(Float16Array, 'arguments/0/left/object/object/object').prototype, 'arguments/0/left/object/object').lastIndexOf, 'arguments/0/left/object').name, 'arguments/0/left') === 'lastIndexOf', 'arguments/0'), {
                content: 'assert(Float16Array.prototype.lastIndexOf.name === "lastIndexOf")',
                filepath: 'test/Float16Array.js',
                line: 1702
            }));
        });
        it('property `length` is 1', () => {
            var _rec313 = new _PowerAssertRecorder1();
            assert(_rec313._expr(_rec313._capt(_rec313._capt(_rec313._capt(_rec313._capt(_rec313._capt(Float16Array, 'arguments/0/left/object/object/object').prototype, 'arguments/0/left/object/object').lastIndexOf, 'arguments/0/left/object').length, 'arguments/0/left') === 1, 'arguments/0'), {
                content: 'assert(Float16Array.prototype.lastIndexOf.length === 1)',
                filepath: 'test/Float16Array.js',
                line: 1706
            }));
        });
        it('check lastIndexOf', () => {
            var _rec314 = new _PowerAssertRecorder1();
            var _rec315 = new _PowerAssertRecorder1();
            var _rec316 = new _PowerAssertRecorder1();
            var _rec317 = new _PowerAssertRecorder1();
            var _rec318 = new _PowerAssertRecorder1();
            var _rec319 = new _PowerAssertRecorder1();
            const float16 = new Float16Array([
                1,
                2,
                3
            ]);
            assert(_rec314._expr(_rec314._capt(_rec314._capt(_rec314._capt(float16, 'arguments/0/left/callee/object').lastIndexOf(1), 'arguments/0/left') === 0, 'arguments/0'), {
                content: 'assert(float16.lastIndexOf(1) === 0)',
                filepath: 'test/Float16Array.js',
                line: 1712
            }));
            assert(_rec315._expr(_rec315._capt(_rec315._capt(_rec315._capt(float16, 'arguments/0/left/callee/object').lastIndexOf(2, 1), 'arguments/0/left') === 1, 'arguments/0'), {
                content: 'assert(float16.lastIndexOf(2, 1) === 1)',
                filepath: 'test/Float16Array.js',
                line: 1713
            }));
            assert(_rec316._expr(_rec316._capt(_rec316._capt(_rec316._capt(float16, 'arguments/0/left/callee/object').lastIndexOf(2, _rec316._capt(-2, 'arguments/0/left/arguments/1')), 'arguments/0/left') === 1, 'arguments/0'), {
                content: 'assert(float16.lastIndexOf(2, -2) === 1)',
                filepath: 'test/Float16Array.js',
                line: 1714
            }));
            assert(_rec317._expr(_rec317._capt(_rec317._capt(_rec317._capt(float16, 'arguments/0/left/callee/object').lastIndexOf(2, _rec317._capt(-3, 'arguments/0/left/arguments/1')), 'arguments/0/left') === _rec317._capt(-1, 'arguments/0/right'), 'arguments/0'), {
                content: 'assert(float16.lastIndexOf(2, -3) === -1)',
                filepath: 'test/Float16Array.js',
                line: 1715
            }));
            assert(_rec318._expr(_rec318._capt(_rec318._capt(_rec318._capt(float16, 'arguments/0/left/callee/object').lastIndexOf(2, _rec318._capt(-5, 'arguments/0/left/arguments/1')), 'arguments/0/left') === _rec318._capt(-1, 'arguments/0/right'), 'arguments/0'), {
                content: 'assert(float16.lastIndexOf(2, -5) === -1)',
                filepath: 'test/Float16Array.js',
                line: 1716
            }));
            assert(_rec319._expr(_rec319._capt(_rec319._capt(_rec319._capt(float16, 'arguments/0/left/callee/object').lastIndexOf(3, 1), 'arguments/0/left') === _rec319._capt(-1, 'arguments/0/right'), 'arguments/0'), {
                content: 'assert(float16.lastIndexOf(3, 1) === -1)',
                filepath: 'test/Float16Array.js',
                line: 1717
            }));
        });
    });
    describe('#includes()', () => {
        it('property `name` is \'includes\'', () => {
            var _rec320 = new _PowerAssertRecorder1();
            assert(_rec320._expr(_rec320._capt(_rec320._capt(_rec320._capt(_rec320._capt(_rec320._capt(Float16Array, 'arguments/0/left/object/object/object').prototype, 'arguments/0/left/object/object').includes, 'arguments/0/left/object').name, 'arguments/0/left') === 'includes', 'arguments/0'), {
                content: 'assert(Float16Array.prototype.includes.name === "includes")',
                filepath: 'test/Float16Array.js',
                line: 1723
            }));
        });
        it('property `length` is 1', () => {
            var _rec321 = new _PowerAssertRecorder1();
            assert(_rec321._expr(_rec321._capt(_rec321._capt(_rec321._capt(_rec321._capt(_rec321._capt(Float16Array, 'arguments/0/left/object/object/object').prototype, 'arguments/0/left/object/object').includes, 'arguments/0/left/object').length, 'arguments/0/left') === 1, 'arguments/0'), {
                content: 'assert(Float16Array.prototype.includes.length === 1)',
                filepath: 'test/Float16Array.js',
                line: 1727
            }));
        });
        it('check includes', () => {
            var _rec322 = new _PowerAssertRecorder1();
            var _rec323 = new _PowerAssertRecorder1();
            var _rec324 = new _PowerAssertRecorder1();
            var _rec325 = new _PowerAssertRecorder1();
            var _rec326 = new _PowerAssertRecorder1();
            const float16 = new Float16Array([
                1,
                2,
                3
            ]);
            assert(_rec322._expr(_rec322._capt(_rec322._capt(_rec322._capt(float16, 'arguments/0/left/callee/object').includes(1), 'arguments/0/left') === true, 'arguments/0'), {
                content: 'assert(float16.includes(1) === true)',
                filepath: 'test/Float16Array.js',
                line: 1733
            }));
            assert(_rec323._expr(_rec323._capt(_rec323._capt(_rec323._capt(float16, 'arguments/0/left/callee/object').includes(1, 1), 'arguments/0/left') === false, 'arguments/0'), {
                content: 'assert(float16.includes(1, 1) === false)',
                filepath: 'test/Float16Array.js',
                line: 1734
            }));
            assert(_rec324._expr(_rec324._capt(_rec324._capt(_rec324._capt(float16, 'arguments/0/left/callee/object').includes(2, 1), 'arguments/0/left') === true, 'arguments/0'), {
                content: 'assert(float16.includes(2, 1) === true)',
                filepath: 'test/Float16Array.js',
                line: 1735
            }));
            assert(_rec325._expr(_rec325._capt(_rec325._capt(_rec325._capt(float16, 'arguments/0/left/callee/object').includes(2, _rec325._capt(-1, 'arguments/0/left/arguments/1')), 'arguments/0/left') === false, 'arguments/0'), {
                content: 'assert(float16.includes(2, -1) === false)',
                filepath: 'test/Float16Array.js',
                line: 1736
            }));
            assert(_rec326._expr(_rec326._capt(_rec326._capt(_rec326._capt(float16, 'arguments/0/left/callee/object').includes(2, _rec326._capt(-2, 'arguments/0/left/arguments/1')), 'arguments/0/left') === true, 'arguments/0'), {
                content: 'assert(float16.includes(2, -2) === true)',
                filepath: 'test/Float16Array.js',
                line: 1737
            }));
        });
    });
    describe('#join()', () => {
        it('property `name` is \'join\'', () => {
            var _rec327 = new _PowerAssertRecorder1();
            assert(_rec327._expr(_rec327._capt(_rec327._capt(_rec327._capt(_rec327._capt(_rec327._capt(Float16Array, 'arguments/0/left/object/object/object').prototype, 'arguments/0/left/object/object').join, 'arguments/0/left/object').name, 'arguments/0/left') === 'join', 'arguments/0'), {
                content: 'assert(Float16Array.prototype.join.name === "join")',
                filepath: 'test/Float16Array.js',
                line: 1743
            }));
        });
        it('property `length` is 0', () => {
            var _rec328 = new _PowerAssertRecorder1();
            assert(_rec328._expr(_rec328._capt(_rec328._capt(_rec328._capt(_rec328._capt(_rec328._capt(Float16Array, 'arguments/0/left/object/object/object').prototype, 'arguments/0/left/object/object').join, 'arguments/0/left/object').length, 'arguments/0/left') === 0, 'arguments/0'), {
                content: 'assert(Float16Array.prototype.join.length === 0)',
                filepath: 'test/Float16Array.js',
                line: 1747
            }));
        });
        it('check join', () => {
            var _rec329 = new _PowerAssertRecorder1();
            var _rec330 = new _PowerAssertRecorder1();
            const float16 = new Float16Array([
                1,
                2,
                3
            ]);
            assert(_rec329._expr(_rec329._capt(_rec329._capt(_rec329._capt(float16, 'arguments/0/left/callee/object').join(), 'arguments/0/left') === '1,2,3', 'arguments/0'), {
                content: 'assert(float16.join() === "1,2,3")',
                filepath: 'test/Float16Array.js',
                line: 1753
            }));
            assert(_rec330._expr(_rec330._capt(_rec330._capt(_rec330._capt(float16, 'arguments/0/left/callee/object').join('|'), 'arguments/0/left') === '1|2|3', 'arguments/0'), {
                content: 'assert(float16.join("|") === "1|2|3")',
                filepath: 'test/Float16Array.js',
                line: 1754
            }));
        });
    });
    describe('#toLocaleString()', () => {
        it('property `name` is \'toLocaleString\'', () => {
            var _rec331 = new _PowerAssertRecorder1();
            assert(_rec331._expr(_rec331._capt(_rec331._capt(_rec331._capt(_rec331._capt(_rec331._capt(Float16Array, 'arguments/0/left/object/object/object').prototype, 'arguments/0/left/object/object').toLocaleString, 'arguments/0/left/object').name, 'arguments/0/left') === 'toLocaleString', 'arguments/0'), {
                content: 'assert(Float16Array.prototype.toLocaleString.name === "toLocaleString")',
                filepath: 'test/Float16Array.js',
                line: 1760
            }));
        });
        it('property `length` is 0', () => {
            var _rec332 = new _PowerAssertRecorder1();
            assert(_rec332._expr(_rec332._capt(_rec332._capt(_rec332._capt(_rec332._capt(_rec332._capt(Float16Array, 'arguments/0/left/object/object/object').prototype, 'arguments/0/left/object/object').toLocaleString, 'arguments/0/left/object').length, 'arguments/0/left') === 0, 'arguments/0'), {
                content: 'assert(Float16Array.prototype.toLocaleString.length === 0)',
                filepath: 'test/Float16Array.js',
                line: 1764
            }));
        });
        it('same as Array', () => {
            var _rec333 = new _PowerAssertRecorder1();
            const float16 = new Float16Array([
                1,
                2,
                3
            ]);
            assert(_rec333._expr(_rec333._capt(_rec333._capt(_rec333._capt(float16, 'arguments/0/left/callee/object').toLocaleString(), 'arguments/0/left') === _rec333._capt(_rec333._capt([
                1,
                2,
                3
            ], 'arguments/0/right/callee/object').toLocaleString(), 'arguments/0/right'), 'arguments/0'), {
                content: 'assert(float16.toLocaleString() === [1,2,3].toLocaleString())',
                filepath: 'test/Float16Array.js',
                line: 1769
            }));
        });
    });
    describe('#toString()', () => {
        it('property `name` is \'toString\'', () => {
            var _rec334 = new _PowerAssertRecorder1();
            assert(_rec334._expr(_rec334._capt(_rec334._capt(_rec334._capt(_rec334._capt(_rec334._capt(Float16Array, 'arguments/0/left/object/object/object').prototype, 'arguments/0/left/object/object').toString, 'arguments/0/left/object').name, 'arguments/0/left') === 'toString', 'arguments/0'), {
                content: 'assert(Float16Array.prototype.toString.name === "toString")',
                filepath: 'test/Float16Array.js',
                line: 1775
            }));
        });
        it('property `length` is 0', () => {
            var _rec335 = new _PowerAssertRecorder1();
            assert(_rec335._expr(_rec335._capt(_rec335._capt(_rec335._capt(_rec335._capt(_rec335._capt(Float16Array, 'arguments/0/left/object/object/object').prototype, 'arguments/0/left/object/object').toString, 'arguments/0/left/object').length, 'arguments/0/left') === 0, 'arguments/0'), {
                content: 'assert(Float16Array.prototype.toString.length === 0)',
                filepath: 'test/Float16Array.js',
                line: 1779
            }));
        });
        it('check toString', () => {
            var _rec336 = new _PowerAssertRecorder1();
            const float16 = new Float16Array([
                1,
                2,
                3
            ]);
            assert(_rec336._expr(_rec336._capt(_rec336._capt(_rec336._capt(float16, 'arguments/0/left/callee/object').toString(), 'arguments/0/left') === '1,2,3', 'arguments/0'), {
                content: 'assert(float16.toString() === "1,2,3")',
                filepath: 'test/Float16Array.js',
                line: 1784
            }));
        });
        it('call Array#toString by Float16Array', () => {
            var _rec337 = new _PowerAssertRecorder1();
            const float16 = new Float16Array([
                1,
                2,
                3
            ]);
            assert(_rec337._expr(_rec337._capt(_rec337._capt(_rec337._capt(_rec337._capt(_rec337._capt(Array, 'arguments/0/left/callee/object/object/object').prototype, 'arguments/0/left/callee/object/object').toString, 'arguments/0/left/callee/object').call(_rec337._capt(float16, 'arguments/0/left/arguments/0')), 'arguments/0/left') === '1,2,3', 'arguments/0'), {
                content: 'assert(Array.prototype.toString.call(float16) === "1,2,3")',
                filepath: 'test/Float16Array.js',
                line: 1789
            }));
        });
        it('call Float16Array#toString by Array', () => {
            var _rec338 = new _PowerAssertRecorder1();
            const array = [
                1,
                2,
                3
            ];
            assert(_rec338._expr(_rec338._capt(_rec338._capt(_rec338._capt(_rec338._capt(_rec338._capt(Float16Array, 'arguments/0/left/callee/object/object/object').prototype, 'arguments/0/left/callee/object/object').toString, 'arguments/0/left/callee/object').call(_rec338._capt(array, 'arguments/0/left/arguments/0')), 'arguments/0/left') === '1,2,3', 'arguments/0'), {
                content: 'assert(Float16Array.prototype.toString.call(array) === "1,2,3")',
                filepath: 'test/Float16Array.js',
                line: 1794
            }));
        });
    });
});
describe('isFloat16Array', () => {
    let AnotherRealmFloat16Array;
    before(async function () {
        if (typeof window !== 'undefined') {
            const iframe = document.getElementById('realm');
            const iWindow = iframe.contentWindow;
            const iDocument = iframe.contentDocument;
            let success = false;
            if (iDocument.readyState !== 'complete' || iDocument.getElementById('float16') === null) {
                try {
                    await new Promise((resolve, reject) => {
                        const id = setTimeout(() => reject(new Error('Timeout Error')), 10000);
                        iframe.addEventListener('load', () => {
                            clearTimeout(id);
                            resolve();
                        }, { once: true });
                    });
                    success = true;
                } catch (e) {
                    console.error(e);
                }
            } else {
                success = true;
            }
            if (success) {
                AnotherRealmFloat16Array = iWindow.float16.Float16Array;
            }
        }
    });
    it('property `name` is \'isFloat16Array\'', () => {
        var _rec339 = new _PowerAssertRecorder1();
        assert(_rec339._expr(_rec339._capt(_rec339._capt(_rec339._capt(isFloat16Array, 'arguments/0/left/object').name, 'arguments/0/left') === 'isFloat16Array', 'arguments/0'), {
            content: 'assert(isFloat16Array.name === "isFloat16Array")',
            filepath: 'test/Float16Array.js',
            line: 1841
        }));
    });
    it('property `length` is 1', () => {
        var _rec340 = new _PowerAssertRecorder1();
        assert(_rec340._expr(_rec340._capt(_rec340._capt(_rec340._capt(isFloat16Array, 'arguments/0/left/object').length, 'arguments/0/left') === 1, 'arguments/0'), {
            content: 'assert(isFloat16Array.length === 1)',
            filepath: 'test/Float16Array.js',
            line: 1845
        }));
    });
    it('check if Float16Array', () => {
        var _rec341 = new _PowerAssertRecorder1();
        var _rec342 = new _PowerAssertRecorder1();
        var _rec343 = new _PowerAssertRecorder1();
        var _rec344 = new _PowerAssertRecorder1();
        var _rec345 = new _PowerAssertRecorder1();
        var _rec346 = new _PowerAssertRecorder1();
        var _rec347 = new _PowerAssertRecorder1();
        var _rec348 = new _PowerAssertRecorder1();
        var _rec349 = new _PowerAssertRecorder1();
        var _rec350 = new _PowerAssertRecorder1();
        var _rec351 = new _PowerAssertRecorder1();
        var _rec352 = new _PowerAssertRecorder1();
        var _rec353 = new _PowerAssertRecorder1();
        var _rec354 = new _PowerAssertRecorder1();
        var _rec355 = new _PowerAssertRecorder1();
        var _rec356 = new _PowerAssertRecorder1();
        var _rec357 = new _PowerAssertRecorder1();
        var _rec358 = new _PowerAssertRecorder1();
        var _rec359 = new _PowerAssertRecorder1();
        var _rec360 = new _PowerAssertRecorder1();
        var _rec361 = new _PowerAssertRecorder1();
        assert(_rec341._expr(_rec341._capt(_rec341._capt(isFloat16Array(_rec341._capt(new Float16Array(), 'arguments/0/left/arguments/0')), 'arguments/0/left') === true, 'arguments/0'), {
            content: 'assert(isFloat16Array(new Float16Array()) === true)',
            filepath: 'test/Float16Array.js',
            line: 1849
        }));
        assert(_rec342._expr(_rec342._capt(_rec342._capt(isFloat16Array(_rec342._capt(new Float32Array(), 'arguments/0/left/arguments/0')), 'arguments/0/left') === false, 'arguments/0'), {
            content: 'assert(isFloat16Array(new Float32Array()) === false)',
            filepath: 'test/Float16Array.js',
            line: 1850
        }));
        assert(_rec343._expr(_rec343._capt(_rec343._capt(isFloat16Array(_rec343._capt(new Uint16Array(), 'arguments/0/left/arguments/0')), 'arguments/0/left') === false, 'arguments/0'), {
            content: 'assert(isFloat16Array(new Uint16Array()) === false)',
            filepath: 'test/Float16Array.js',
            line: 1851
        }));
        assert(_rec344._expr(_rec344._capt(_rec344._capt(isFloat16Array(), 'arguments/0/left') === false, 'arguments/0'), {
            content: 'assert(isFloat16Array() === false)',
            filepath: 'test/Float16Array.js',
            line: 1853
        }));
        assert(_rec345._expr(_rec345._capt(_rec345._capt(isFloat16Array(null), 'arguments/0/left') === false, 'arguments/0'), {
            content: 'assert(isFloat16Array(null) === false)',
            filepath: 'test/Float16Array.js',
            line: 1854
        }));
        assert(_rec346._expr(_rec346._capt(_rec346._capt(isFloat16Array(_rec346._capt(undefined, 'arguments/0/left/arguments/0')), 'arguments/0/left') === false, 'arguments/0'), {
            content: 'assert(isFloat16Array(undefined) === false)',
            filepath: 'test/Float16Array.js',
            line: 1855
        }));
        assert(_rec347._expr(_rec347._capt(_rec347._capt(isFloat16Array(0), 'arguments/0/left') === false, 'arguments/0'), {
            content: 'assert(isFloat16Array(0) === false)',
            filepath: 'test/Float16Array.js',
            line: 1856
        }));
        assert(_rec348._expr(_rec348._capt(_rec348._capt(isFloat16Array(1), 'arguments/0/left') === false, 'arguments/0'), {
            content: 'assert(isFloat16Array(1) === false)',
            filepath: 'test/Float16Array.js',
            line: 1857
        }));
        assert(_rec349._expr(_rec349._capt(_rec349._capt(isFloat16Array(_rec349._capt(NaN, 'arguments/0/left/arguments/0')), 'arguments/0/left') === false, 'arguments/0'), {
            content: 'assert(isFloat16Array(NaN) === false)',
            filepath: 'test/Float16Array.js',
            line: 1858
        }));
        assert(_rec350._expr(_rec350._capt(_rec350._capt(isFloat16Array(_rec350._capt(Infinity, 'arguments/0/left/arguments/0')), 'arguments/0/left') === false, 'arguments/0'), {
            content: 'assert(isFloat16Array(Infinity) === false)',
            filepath: 'test/Float16Array.js',
            line: 1859
        }));
        assert(_rec351._expr(_rec351._capt(_rec351._capt(isFloat16Array(true), 'arguments/0/left') === false, 'arguments/0'), {
            content: 'assert(isFloat16Array(true) === false)',
            filepath: 'test/Float16Array.js',
            line: 1860
        }));
        assert(_rec352._expr(_rec352._capt(_rec352._capt(isFloat16Array(false), 'arguments/0/left') === false, 'arguments/0'), {
            content: 'assert(isFloat16Array(false) === false)',
            filepath: 'test/Float16Array.js',
            line: 1861
        }));
        assert(_rec353._expr(_rec353._capt(_rec353._capt(isFloat16Array(''), 'arguments/0/left') === false, 'arguments/0'), {
            content: 'assert(isFloat16Array("") === false)',
            filepath: 'test/Float16Array.js',
            line: 1862
        }));
        assert(_rec354._expr(_rec354._capt(_rec354._capt(isFloat16Array('foo'), 'arguments/0/left') === false, 'arguments/0'), {
            content: 'assert(isFloat16Array("foo") === false)',
            filepath: 'test/Float16Array.js',
            line: 1863
        }));
        assert(_rec355._expr(_rec355._capt(_rec355._capt(isFloat16Array(_rec355._capt(Symbol(), 'arguments/0/left/arguments/0')), 'arguments/0/left') === false, 'arguments/0'), {
            content: 'assert(isFloat16Array(Symbol()) === false)',
            filepath: 'test/Float16Array.js',
            line: 1864
        }));
        if (typeof BigInt !== 'undefined') {
            assert(_rec356._expr(_rec356._capt(_rec356._capt(isFloat16Array(_rec356._capt(BigInt(0), 'arguments/0/left/arguments/0')), 'arguments/0/left') === false, 'arguments/0'), {
                content: 'assert(isFloat16Array(BigInt(0)) === false)',
                filepath: 'test/Float16Array.js',
                line: 1868
            }));
            assert(_rec357._expr(_rec357._capt(_rec357._capt(isFloat16Array(_rec357._capt(BigInt(1), 'arguments/0/left/arguments/0')), 'arguments/0/left') === false, 'arguments/0'), {
                content: 'assert(isFloat16Array(BigInt(1)) === false)',
                filepath: 'test/Float16Array.js',
                line: 1869
            }));
        }
        assert(_rec358._expr(_rec358._capt(_rec358._capt(isFloat16Array(_rec358._capt({}, 'arguments/0/left/arguments/0')), 'arguments/0/left') === false, 'arguments/0'), {
            content: 'assert(isFloat16Array({}) === false)',
            filepath: 'test/Float16Array.js',
            line: 1872
        }));
        assert(_rec359._expr(_rec359._capt(_rec359._capt(isFloat16Array(_rec359._capt([], 'arguments/0/left/arguments/0')), 'arguments/0/left') === false, 'arguments/0'), {
            content: 'assert(isFloat16Array([]) === false)',
            filepath: 'test/Float16Array.js',
            line: 1873
        }));
        assert(_rec360._expr(_rec360._capt(_rec360._capt(isFloat16Array(/a/), 'arguments/0/left') === false, 'arguments/0'), {
            content: 'assert(isFloat16Array(/a/) === false)',
            filepath: 'test/Float16Array.js',
            line: 1874
        }));
        assert(_rec361._expr(_rec361._capt(_rec361._capt(isFloat16Array(() => {
        }), 'arguments/0/left') === false, 'arguments/0'), {
            content: 'assert(isFloat16Array(() => {}) === false)',
            filepath: 'test/Float16Array.js',
            line: 1875
        }));
    });
    it('check if Float16Array from another realm', function () {
        var _rec362 = new _PowerAssertRecorder1();
        if (AnotherRealmFloat16Array === undefined) {
            this.skip();
        }
        assert(_rec362._expr(_rec362._capt(_rec362._capt(isFloat16Array(_rec362._capt(new AnotherRealmFloat16Array(), 'arguments/0/left/arguments/0')), 'arguments/0/left') === true, 'arguments/0'), {
            content: 'assert(isFloat16Array(new AnotherRealmFloat16Array()) === true)',
            filepath: 'test/Float16Array.js',
            line: 1883
        }));
    });
});
//# sourceMappingURL=Float16Array.power.js.map

