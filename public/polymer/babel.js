/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */!function(a){"use strict";function b(a,b,c,e){// If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
var f=b&&b.prototype instanceof d?b:d,g=Object.create(f.prototype),h=new m(e||[]);return g._invoke=i(a,c,h),g}// Try/catch helper to minimize deoptimizations. Returns a completion
// record like context.tryEntries[i].completion. This interface could
// have been (and was previously) designed to take a closure to be
// invoked without arguments, but in all the cases we care about we
// already have an existing method we want to call, so there's no need
// to create a new function object. We can even get away with assuming
// the method takes exactly one argument, since that happens to be true
// in every case, so we don't have to touch the arguments object. The
// only additional allocation required is the completion record, which
// has a stable shape and so hopefully should be cheap to allocate.
function c(a,b,c){try{return{type:"normal",arg:a.call(b,c)}}catch(a){return{type:"throw",arg:a}}}// Dummy constructor functions that we use as the .constructor and
// .constructor.prototype properties for functions that return Generator
// objects. For full spec compliance, you may wish to configure your
// minifier not to mangle the names of these two functions.
function d(){}function e(){}function f(){}// This is a polyfill for %IteratorPrototype% for environments that
// don't natively support it.
// Helper for defining the .next, .throw, and .return methods of the
// Iterator interface in terms of a single ._invoke method.
function g(a){["next","throw","return"].forEach(function(b){a[b]=function(a){return this._invoke(b,a)}})}function h(a){function b(d,e,f,g){var h=c(a[d],a,e);if("throw"===h.type)g(h.arg);else{var i=h.arg,j=i.value;return j&&"object"===typeof j&&q.call(j,"__await")?Promise.resolve(j.__await).then(function(a){b("next",a,f,g)},function(a){b("throw",a,f,g)}):Promise.resolve(j).then(function(a){// When a yielded Promise is resolved, its final value becomes
// the .value of the Promise<{value,done}> result for the
// current iteration. If the Promise is rejected, however, the
// result for this iteration will be rejected with the same
// reason. Note that rejections of yielded Promises are not
// thrown back into the generator function, as is the case
// when an awaited Promise is rejected. This difference in
// behavior between yield and await is important, because it
// allows the consumer to decide what to do with the yielded
// rejection (swallow it and continue, manually .throw it back
// into the generator, abandon iteration, whatever). With
// await, by contrast, there is no opportunity to examine the
// rejection reason outside the generator function, so the
// only option is to throw it from the await expression, and
// let the generator function handle the exception.
i.value=a,f(i)},g)}}function d(a,c){function d(){return new Promise(function(d,e){b(a,c,d,e)})}return e=// If enqueue has been called before, then we want to wait until
// all previous Promises have been resolved before calling invoke,
// so that results are always delivered in the correct order. If
// enqueue has not been called before, then it is important to
// call invoke immediately, without waiting on a callback to fire,
// so that the async generator function has the opportunity to do
// any necessary setup in a predictable way. This predictability
// is why the Promise constructor synchronously invokes its
// executor callback, and why async functions synchronously
// execute code before the first await. Since we implement simple
// async functions in terms of async generators, it is especially
// important to get this right, even though it requires care.
e?e.then(d,// Avoid propagating failures to Promises returned by later
// invocations of the iterator.
d):d()}// Define the unified helper method that is used to implement .next,
// .throw, and .return (see defineIteratorMethods).
var e;this._invoke=d}function i(a,b,d){var e="suspendedStart";return function(f,g){if(e==="executing")throw new Error("Generator is already running");if("completed"===e){if("throw"===f)throw g;// Be forgiving, per 25.3.3.3.3 of the spec:
// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
return o()}for(d.method=f,d.arg=g;;){var h=d.delegate;if(h){var i=j(h,d);if(i){if(i===x)continue;return i}}if("next"===d.method)// Setting context._sent for legacy support of Babel's
// function.sent implementation.
d.sent=d._sent=d.arg;else if("throw"===d.method){if("suspendedStart"===e)throw e="completed",d.arg;d.dispatchException(d.arg)}else"return"===d.method&&d.abrupt("return",d.arg);e="executing";var k=c(a,b,d);if("normal"===k.type){if(e=d.done?"completed":"suspendedYield",k.arg===x)continue;return{value:k.arg,done:d.done}}"throw"===k.type&&(// Dispatch the exception by looping back around to the
// context.dispatchException(context.arg) call above.
e="completed",d.method="throw",d.arg=k.arg)}}}// Call delegate.iterator[context.method](context.arg) and handle the
// result, either by returning a { value, done } result from the
// delegate iterator, or by modifying context.method and context.arg,
// setting context.delegate to null, and returning the ContinueSentinel.
function j(a,b){var d=a.iterator[b.method];if(void 0===d){if(b.delegate=null,"throw"===b.method){if(a.iterator.return&&(b.method="return",b.arg=void 0,j(a,b),"throw"===b.method))// If maybeInvokeDelegate(context) changed context.method from
// "return" to "throw", let that override the TypeError below.
return x;b.method="throw",b.arg=new TypeError("The iterator does not provide a 'throw' method")}return x}var e=c(d,a.iterator,b.arg);if("throw"===e.type)return b.method="throw",b.arg=e.arg,b.delegate=null,x;var f=e.arg;if(!f)return b.method="throw",b.arg=new TypeError("iterator result is not an object"),b.delegate=null,x;if(f.done)b[a.resultName]=f.value,b.next=a.nextLoc,"return"!==b.method&&(b.method="next",b.arg=void 0);else// Re-yield the result returned by the delegate method.
return f;// The delegate iterator is finished, so forget it and continue with
// the outer generator.
return b.delegate=null,x}// Define Generator.prototype.{next,throw,return} in terms of the
// unified ._invoke helper method.
function k(a){var b={tryLoc:a[0]};1 in a&&(b.catchLoc=a[1]),2 in a&&(b.finallyLoc=a[2],b.afterLoc=a[3]),this.tryEntries.push(b)}function l(a){var b=a.completion||{};b.type="normal",delete b.arg,a.completion=b}function m(a){// The root entry object (effectively a try statement without a catch
// or a finally block) gives us a place to store values thrown from
// locations where there is no enclosing try statement.
this.tryEntries=[{tryLoc:"root"}],a.forEach(k,this),this.reset(!0)}function n(a){if(a){var b=a[s];if(b)return b.call(a);if("function"===typeof a.next)return a;if(!isNaN(a.length)){var c=-1,d=function b(){for(;++c<a.length;)if(q.call(a,c))return b.value=a[c],b.done=!1,b;return b.value=void 0,b.done=!0,b};return d.next=d}}// Return an iterator with no values.
return{next:o}}function o(){return{value:void 0,done:!0}}var p=Object.prototype,q=p.hasOwnProperty,r="function"===typeof Symbol?Symbol:{},s=r.iterator||"@@iterator",t=r.asyncIterator||"@@asyncIterator",u=r.toStringTag||"@@toStringTag",v="object"===typeof module,w=a.regeneratorRuntime;if(w)// Don't bother evaluating the rest of this file if the runtime was
// already defined globally.
return void(v&&(module.exports=w));// Define the runtime globally (as expected by generated code) as either
// module.exports (if we're in a module) or a new, empty object.
w=a.regeneratorRuntime=v?module.exports:{},w.wrap=b;var x={},y={};y[s]=function(){return this};var z=Object.getPrototypeOf,A=z&&z(z(n([])));A&&A!==p&&q.call(A,s)&&(y=A);var B=f.prototype=d.prototype=Object.create(y);// Within the body of any async function, `await x` is transformed to
// `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
// `hasOwn.call(value, "__await")` to determine if the yielded value is
// meant to be awaited.
// Note that simple async functions are implemented on top of
// AsyncIterator objects; they just return a Promise for the value of
// the final result produced by the iterator.
// A Generator should always return itself as the iterator object when the
// @@iterator function is called on it. Some browsers' implementations of the
// iterator prototype chain incorrectly implement this, causing the Generator
// object to not be returned from this call. This ensures that doesn't happen.
// See https://github.com/facebook/regenerator/issues/274 for more details.
e.prototype=B.constructor=f,f.constructor=e,f[u]=e.displayName="GeneratorFunction",w.isGeneratorFunction=function(a){var b="function"===typeof a&&a.constructor;return!!b&&(b===e||// For the native GeneratorFunction constructor, the best we can
// do is to check its .name property.
"GeneratorFunction"===(b.displayName||b.name))},w.mark=function(a){return Object.setPrototypeOf?Object.setPrototypeOf(a,f):(a.__proto__=f,!(u in a)&&(a[u]="GeneratorFunction")),a.prototype=Object.create(B),a},w.awrap=function(a){return{__await:a}},g(h.prototype),h.prototype[t]=function(){return this},w.AsyncIterator=h,w.async=function(a,c,d,e){var f=new h(b(a,c,d,e));return w.isGeneratorFunction(c)?f// If outerFn is a generator, return the full iterator.
:f.next().then(function(a){return a.done?a.value:f.next()})},g(B),B[u]="Generator",B[s]=function(){return this},B.toString=function(){return"[object Generator]"},w.keys=function(a){var b=[];for(var c in a)b.push(c);// Rather than returning an object with a next method, we keep
// things simple and return the next function itself.
return b.reverse(),function c(){for(;b.length;){var d=b.pop();if(d in a)return c.value=d,c.done=!1,c}// To avoid creating an additional object, we just hang the .value
// and .done properties off the next function object itself. This
// also ensures that the minifier will not anonymize the function.
return c.done=!0,c}},w.values=n,m.prototype={constructor:m,reset:function(a){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(l),!a)for(var b in this)// Not sure about the optimal order of these conditions:
"t"===b.charAt(0)&&q.call(this,b)&&!isNaN(+b.slice(1))&&(this[b]=void 0)},stop:function(){this.done=!0;var a=this.tryEntries[0],b=a.completion;if("throw"===b.type)throw b.arg;return this.rval},dispatchException:function(a){function b(b,d){return f.type="throw",f.arg=a,c.next=b,d&&(c.method="next",c.arg=void 0),!!d}if(this.done)throw a;for(var c=this,d=this.tryEntries.length-1;0<=d;--d){var e=this.tryEntries[d],f=e.completion;if("root"===e.tryLoc)// Exception thrown outside of any try block that could handle
// it, so set the completion value of the entire function to
// throw the exception.
return b("end");if(e.tryLoc<=this.prev){var g=q.call(e,"catchLoc"),h=q.call(e,"finallyLoc");if(g&&h){if(this.prev<e.catchLoc)return b(e.catchLoc,!0);if(this.prev<e.finallyLoc)return b(e.finallyLoc)}else if(g){if(this.prev<e.catchLoc)return b(e.catchLoc,!0);}else if(!h)throw new Error("try statement without catch or finally");else if(this.prev<e.finallyLoc)return b(e.finallyLoc)}}},abrupt:function(a,b){for(var c,d=this.tryEntries.length-1;0<=d;--d)if(c=this.tryEntries[d],c.tryLoc<=this.prev&&q.call(c,"finallyLoc")&&this.prev<c.finallyLoc){var e=c;break}e&&("break"===a||"continue"===a)&&e.tryLoc<=b&&b<=e.finallyLoc&&(e=null);var f=e?e.completion:{};return f.type=a,f.arg=b,e?(this.method="next",this.next=e.finallyLoc,x):this.complete(f)},complete:function(a,b){if("throw"===a.type)throw a.arg;return"break"===a.type||"continue"===a.type?this.next=a.arg:"return"===a.type?(this.rval=this.arg=a.arg,this.method="return",this.next="end"):"normal"===a.type&&b&&(this.next=b),x},finish:function(a){for(var b,c=this.tryEntries.length-1;0<=c;--c)if(b=this.tryEntries[c],b.finallyLoc===a)return this.complete(b.completion,b.afterLoc),l(b),x},catch:function(a){for(var b,c=this.tryEntries.length-1;0<=c;--c)if(b=this.tryEntries[c],b.tryLoc===a){var d=b.completion;if("throw"===d.type){var e=d.arg;l(b)}return e}// The context.catch method must only be called with a location
// argument that corresponds to a known catch block.
throw new Error("illegal catch attempt")},delegateYield:function(a,b,c){return this.delegate={iterator:n(a),resultName:b,nextLoc:c},"next"===this.method&&(this.arg=void 0),x}}}(// In sloppy mode, unbound `this` refers to the global object, fallback to
// Function constructor if we're in global strict mode. That is sadly a form
// of indirect eval which violates Content Security Policy.
function(){return this}()||Function("return this")());

(function(a){function b(a){return r.typeof="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?b=function(a){return typeof a}:b=function(a){return a&&"function"===typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},b(a)}function c(a){function b(d,e){try{var f=a[d](e),g=f.value,h=g instanceof r.AwaitValue;Promise.resolve(h?g.wrapped:g).then(function(a){return h?void b("next",a):void c(f.done?"return":"normal",a)},function(a){b("throw",a)})}catch(a){c("throw",a)}}function c(a,c){switch(a){case"return":d.resolve({value:c,done:!0});break;case"throw":d.reject(c);break;default:d.resolve({value:c,done:!1});}d=d.next,d?b(d.key,d.arg):e=null}var d,e;this._invoke=function(a,c){return new Promise(function(f,g){var h={key:a,arg:c,resolve:f,reject:g,next:null};e?e=e.next=h:(d=e=h,b(a,c))})},"function"!==typeof a.return&&(this.return=void 0)}function d(a,b,c,d,e,f,g){try{var h=a[f](g),i=h.value}catch(a){return void c(a)}h.done?b(i):Promise.resolve(i).then(d,e)}function e(a,b){for(var c,d=0;d<b.length;d++)c=b[d],c.enumerable=c.enumerable||!1,c.configurable=!0,"value"in c&&(c.writable=!0),Object.defineProperty(a,c.key,c)}function f(a,b){for(var c in b){var d=b[c];d.configurable=d.enumerable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,c,d)}if(Object.getOwnPropertySymbols)for(var e=Object.getOwnPropertySymbols(b),f=0;f<e.length;f++){var g=e[f],d=b[g];d.configurable=d.enumerable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,g,d)}return a}function g(a,b,c){return b in a?Object.defineProperty(a,b,{value:c,enumerable:!0,configurable:!0,writable:!0}):a[b]=c,a}function h(){return r.extends=h=Object.assign||function(a){for(var b,c=1;c<arguments.length;c++)for(var d in b=arguments[c],b)Object.prototype.hasOwnProperty.call(b,d)&&(a[d]=b[d]);return a},h.apply(this,arguments)}function i(a){return r.getPrototypeOf=i=Object.setPrototypeOf?Object.getPrototypeOf:function(a){return a.__proto__||Object.getPrototypeOf(a)},i(a)}function j(a,b){return r.setPrototypeOf=j=Object.setPrototypeOf||function(a,b){return a.__proto__=b,a},j(a,b)}function k(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(a){return!1}}function l(){return r.construct=k()?l=Reflect.construct:l=function(b,c,d){var e=[null];e.push.apply(e,c);var a=Function.bind.apply(b,e),f=new a;return d&&r.setPrototypeOf(f,d.prototype),f},l.apply(null,arguments)}function m(a){var b="function"===typeof Map?new Map:void 0;return r.wrapNativeSuper=m=function(a){function c(){return r.construct(a,arguments,r.getPrototypeOf(this).constructor)}if(null===a||!r.isNativeFunction(a))return a;if("function"!==typeof a)throw new TypeError("Super expression must either be null or a function");if("undefined"!==typeof b){if(b.has(a))return b.get(a);b.set(a,c)}return c.prototype=Object.create(a.prototype,{constructor:{value:c,enumerable:!1,writable:!0,configurable:!0}}),r.setPrototypeOf(c,a)},m(a)}function n(a,b,c){return r.get="undefined"!==typeof Reflect&&Reflect.get?n=Reflect.get:n=function(a,b,c){var d=r.superPropBase(a,b);if(d){var e=Object.getOwnPropertyDescriptor(d,b);return e.get?e.get.call(c):e.value}},n(a,b,c||a)}function o(a,b,c,d){return o="undefined"!==typeof Reflect&&Reflect.set?Reflect.set:function(a,b,c,d){var e,f=r.superPropBase(a,b);if(f){if(e=Object.getOwnPropertyDescriptor(f,b),e.set)return e.set.call(d,c),!0;if(!e.writable)return!1}if(e=Object.getOwnPropertyDescriptor(d,b),e){if(!e.writable)return!1;e.value=c,Object.defineProperty(d,b,e)}else r.defineProperty(d,b,c);return!0},o(a,b,c,d)}function p(a,b,c,d,e){var f=o(a,b,c,d||a);if(!f&&e)throw new Error("failed to set property");return c}function q(a){if(Symbol.iterator in Object(a)||"[object Arguments]"===Object.prototype.toString.call(a))return Array.from(a)}var r=a.babelHelpers={};r.typeof=b,r.asyncIterator=function(a){var b;if("undefined"!==typeof Symbol){if(Symbol.asyncIterator&&(b=a[Symbol.asyncIterator],null!=b))return b.call(a);if(Symbol.iterator&&(b=a[Symbol.iterator],null!=b))return b.call(a)}throw new TypeError("Object is not async iterable")},r.AwaitValue=function(a){this.wrapped=a},"function"===typeof Symbol&&Symbol.asyncIterator&&(c.prototype[Symbol.asyncIterator]=function(){return this}),c.prototype.next=function(a){return this._invoke("next",a)},c.prototype.throw=function(a){return this._invoke("throw",a)},c.prototype.return=function(a){return this._invoke("return",a)},r.AsyncGenerator=c,r.wrapAsyncGenerator=function(a){return function(){return new r.AsyncGenerator(a.apply(this,arguments))}},r.awaitAsyncGenerator=function(a){return new r.AwaitValue(a)},r.asyncGeneratorDelegate=function(a,b){function c(c,d){return e=!0,d=new Promise(function(b){b(a[c](d))}),{done:!1,value:b(d)}}var d={},e=!1;return"function"===typeof Symbol&&Symbol.iterator&&(d[Symbol.iterator]=function(){return this}),d.next=function(a){return e?(e=!1,a):c("next",a)},"function"===typeof a.throw&&(d.throw=function(a){if(e)throw e=!1,a;return c("throw",a)}),"function"===typeof a.return&&(d.return=function(a){return c("return",a)}),d},r.asyncToGenerator=function(a){return function(){var b=this,c=arguments;return new Promise(function(e,f){function g(a){d(i,e,f,g,h,"next",a)}function h(a){d(i,e,f,g,h,"throw",a)}var i=a.apply(b,c);g(void 0)})}},r.classCallCheck=function(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")},r.createClass=function(a,b,c){return b&&e(a.prototype,b),c&&e(a,c),a},r.defineEnumerableProperties=f,r.defaults=function(a,b){for(var c=Object.getOwnPropertyNames(b),d=0;d<c.length;d++){var e=c[d],f=Object.getOwnPropertyDescriptor(b,e);f&&f.configurable&&a[e]===void 0&&Object.defineProperty(a,e,f)}return a},r.defineProperty=g,r.extends=h,r.objectSpread=function(a){for(var b=1;b<arguments.length;b++){var c=null==arguments[b]?{}:arguments[b],d=Object.keys(c);"function"===typeof Object.getOwnPropertySymbols&&(d=d.concat(Object.getOwnPropertySymbols(c).filter(function(a){return Object.getOwnPropertyDescriptor(c,a).enumerable}))),d.forEach(function(b){r.defineProperty(a,b,c[b])})}return a},r.inherits=function(a,b){if("function"!==typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function");a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,writable:!0,configurable:!0}}),b&&r.setPrototypeOf(a,b)},r.getPrototypeOf=i,r.setPrototypeOf=j,r.construct=l,r.isNativeFunction=function(a){return-1!==Function.toString.call(a).indexOf("[native code]")},r.wrapNativeSuper=m,r.instanceof=function(a,b){return null!=b&&"undefined"!==typeof Symbol&&b[Symbol.hasInstance]?b[Symbol.hasInstance](a):a instanceof b},r.interopRequireDefault=function(a){return a&&a.__esModule?a:{default:a}},r.interopRequireWildcard=function(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)if(Object.prototype.hasOwnProperty.call(a,c)){var d=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(a,c):{};d.get||d.set?Object.defineProperty(b,c,d):b[c]=a[c]}return b.default=a,b},r.newArrowCheck=function(a,b){if(a!==b)throw new TypeError("Cannot instantiate an arrow function")},r.objectDestructuringEmpty=function(a){if(null==a)throw new TypeError("Cannot destructure undefined")},r.objectWithoutPropertiesLoose=function(a,b){if(null==a)return{};var c,d,e={},f=Object.keys(a);for(d=0;d<f.length;d++)c=f[d],0<=b.indexOf(c)||(e[c]=a[c]);return e},r.objectWithoutProperties=function(a,b){if(null==a)return{};var c,d,e=r.objectWithoutPropertiesLoose(a,b);if(Object.getOwnPropertySymbols){var f=Object.getOwnPropertySymbols(a);for(d=0;d<f.length;d++)c=f[d],!(0<=b.indexOf(c))&&Object.prototype.propertyIsEnumerable.call(a,c)&&(e[c]=a[c])}return e},r.assertThisInitialized=function(a){if(void 0===a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return a},r.possibleConstructorReturn=function(a,b){return b&&("object"===typeof b||"function"===typeof b)?b:r.assertThisInitialized(a)},r.superPropBase=function(a,b){for(;!Object.prototype.hasOwnProperty.call(a,b)&&(a=r.getPrototypeOf(a),null!==a););return a},r.get=n,r.set=p,r.taggedTemplateLiteral=function(a,b){return b||(b=a.slice(0)),Object.freeze(Object.defineProperties(a,{raw:{value:Object.freeze(b)}}))},r.temporalRef=function(a,b){if(a===r.temporalUndefined)throw new ReferenceError(b+" is not defined - temporal dead zone");else return a},r.readOnlyError=function(a){throw new Error("\""+a+"\" is read-only")},r.temporalUndefined={},r.slicedToArray=function(a,b){return r.arrayWithHoles(a)||r.iterableToArrayLimit(a,b)||r.nonIterableRest()},r.toArray=function(a){return r.arrayWithHoles(a)||r.iterableToArray(a)||r.nonIterableRest()},r.toConsumableArray=function(a){return r.arrayWithoutHoles(a)||r.iterableToArray(a)||r.nonIterableSpread()},r.arrayWithoutHoles=function(a){if(Array.isArray(a)){for(var b=0,c=Array(a.length);b<a.length;b++)c[b]=a[b];return c}},r.arrayWithHoles=function(a){if(Array.isArray(a))return a},r.iterableToArray=q,r.iterableToArrayLimit=function(a,b){var c=[],d=!0,e=!1,f=void 0;try{for(var g,h=a[Symbol.iterator]();!(d=(g=h.next()).done)&&(c.push(g.value),!(b&&c.length===b));d=!0);}catch(a){e=!0,f=a}finally{try{d||null==h["return"]||h["return"]()}finally{if(e)throw f}}return c},r.nonIterableSpread=function(){throw new TypeError("Invalid attempt to spread non-iterable instance")},r.nonIterableRest=function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")},r.toPropertyKey=function(a){var b=r.toPrimitive(a,"string");return"symbol"===typeof b?b:b+""}})("undefined"===typeof global?self:global);


if (!window.customElements) {
  document.write('<!--');
}

"use strict";(function(){function a(a,b,c){var d=a;if(d.state=b,d.stateData=c,0<d.onNextStateChange.length){var e=d.onNextStateChange.slice();d.onNextStateChange.length=0;for(var f,g=0,h=e;g<h.length;g++)f=h[g],f()}return d}function b(b){function d(){try{document.head.removeChild(f)}catch(a){}}var e=a(b,"Loading",void 0),f=document.createElement("script");return f.src=b.url,null!==b.crossorigin&&f.setAttribute("crossorigin",b.crossorigin),f.onload=function(){var a,b,f;void 0===r?(b=[],f=void 0):(a=r(),b=a[0],f=a[1]),c(e,b,f),d()},f.onerror=function(){g(b,new TypeError("Failed to fetch "+b.url)),d()},document.head.appendChild(f),e}function c(b,c,e){var f=d(b,c),g=f[0],h=f[1];return a(b,"WaitingForTurn",{args:g,deps:h,moduleBody:e})}function d(a,c){for(var e,f=[],g=[],i=0,j=c;i<j.length;i++){if(e=j[i],"exports"===e){f.push(a.exports);continue}if("require"===e){f.push(function(b,c,e){var f=d(a,b),g=f[0],i=f[1];h(i,function(){c&&c.apply(null,g)},e)});continue}if("meta"===e){f.push({url:!0===a.isTopLevel?a.url.substring(0,a.url.lastIndexOf("#")):a.url});continue}var l=k(n(a.urlBase,e),a.crossorigin);f.push(l.exports),g.push(l),"Initialized"===l.state&&b(l)}return[f,g]}function e(b){var c=a(b,"WaitingOnDeps",b.stateData);return h(b.stateData.deps,function(){return f(c)},function(a){return g(c,a)}),c}function f(b){var c=b.stateData;if(null!=c.moduleBody)try{c.moduleBody.apply(null,c.args)}catch(a){return g(b,a)}return a(b,"Executed",void 0)}function g(b,c){return!0===b.isTopLevel&&setTimeout(function(){throw c}),a(b,"Failed",c)}function h(a,b,c){var d=a.shift();return void 0===d?void(b&&b()):"WaitingOnDeps"===d.state?(!1,void h(a,b,c)):void i(d,function(){h(a,b,c)},c)}function i(a,b,c){switch(a.state){case"WaitingForTurn":return e(a),void i(a,b,c);case"Failed":return void(c&&c(a.stateData));case"Executed":return void b();case"Loading":case"WaitingOnDeps":return void a.onNextStateChange.push(function(){return i(a,b,c)});case"Initialized":throw new Error("All dependencies should be loading already before pressureDependencyToExecute is called.");default:throw new Error("Impossible module state: "+a.state);}}function j(a,b){switch(a.state){case"Executed":case"Failed":return void b();default:a.onNextStateChange.push(function(){return j(a,b)});}}function k(a,b){void 0===b&&(b="anonymous");var c=q[a];return void 0===c&&(c=q[a]={url:a,urlBase:m(a),exports:Object.create(null),state:"Initialized",stateData:void 0,isTopLevel:!1,crossorigin:b,onNextStateChange:[]}),c}function l(a){return v.href=a,v.href}function m(a){return a=a.split("?")[0],a=a.split("#")[0],a.substring(0,a.lastIndexOf("/")+1)}function n(a,b){return-1===b.indexOf("://")?l("/"===b[0]?b:a+b):b}function o(){return document.baseURI||(document.querySelector("base")||window.location).href}function p(){var b=document.currentScript;if(!b)return u;if(window.HTMLImports){var c=window.HTMLImports.importForElement(b);return c?c.href:u}var d=b.ownerDocument.createElement("a");return d.href="",d.href}if(!window.define){var q=Object.create(null),r=void 0,s=0,t=void 0,u=o();window.define=function(a,b){var d=!1;r=function(){return d=!0,r=void 0,[a,b]};var f=p(),g=document.currentScript&&document.currentScript.getAttribute("crossorigin")||"anonymous";setTimeout(function(){if(!1==d){r=void 0;var h=f+"#"+s++,i=k(h,g);i.isTopLevel=!0;var l=c(i,a,b);void 0===t?e(l):j(k(t),function(){e(l)}),t=h}},0)},window.define._reset=function(){for(var a in q)delete q[a];r=void 0,s=0,t=void 0,u=o()};var v=document.createElement("a")}})();


define(["require"], function (_require) {
  "use strict";

  _require = babelHelpers.interopRequireWildcard(_require);
  window.WebComponents = window.WebComponents || {
    waitFor: function waitFor(cb) {
      addEventListener('WebComponentsReady', cb);
    }
  };
  WebComponents.waitFor(
  /*#__PURE__*/
  babelHelpers.asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            new Promise(function (res, rej) {
              return _require.default(['/polymer/input-lit-element.js'], res, rej);
            });

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
});