/*
YUI 3.4.1 (build 4118)
Copyright 2011 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add('event-synthetic', function(Y) {

/* Define new DOM events that can be subscribed to from Nodes.
 *
 * @module event
 * @submodule event-synthetic
 */
var DOMMap   = Y.Env.evt.dom_map,
    toArray  = Y.Array,
    YLang    = Y.Lang,
    isObject = YLang.isObject,
    isString = YLang.isString,
    isArray  = YLang.isArray,
    query    = Y.Selector.query,
    noop     = function () {};

/**
 * <p>The triggering mechanism used by SyntheticEvents.</p>
 *
 * <p>Implementers should not instantiate these directly.  Use the Notifier
 * provided to the event's implemented <code>on(node, sub, notifier)</code> or
 * <code>delegate(node, sub, notifier, filter)</code> methods.</p>
 *
 * @class SyntheticEvent.Notifier
 * @constructor
 * @param handle {EventHandle} the detach handle for the subscription to an
 *              internal custom event used to execute the callback passed to
 *              on(..) or delegate(..)
 * @param emitFacade {Boolean} take steps to ensure the first arg received by
 *              the subscription callback is an event facade
 * @private
 * @since 3.2.0
 */
function Notifier(handle, emitFacade) {
    this.handle     = handle;
    this.emitFacade = emitFacade;
}

/**
 * <p>Executes the subscription callback, passing the firing arguments as the
 * first parameters to that callback. For events that are configured with
 * emitFacade=true, it is common practice to pass the triggering DOMEventFacade
 * as the first parameter.  Barring a proper DOMEventFacade or EventFacade
 * (from a CustomEvent), a new EventFacade will be generated.  In that case, if
 * fire() is called with a simple object, it will be mixed into the facade.
 * Otherwise, the facade will be prepended to the callback parameters.</p>
 *
 * <p>For notifiers provided to delegate logic, the first argument should be an
 * object with a &quot;currentTarget&quot; property to identify what object to
 * default as 'this' in the callback.  Typically this is gleaned from the
 * DOMEventFacade or EventFacade, but if configured with emitFacade=false, an
 * object must be provided.  In that case, the object will be removed from the
 * callback parameters.</p>
 *
 * <p>Additional arguments passed during event subscription will be
 * automatically added after those passed to fire().</p>
 *
 * @method fire
 * @param e {EventFacade|DOMEventFacade|Object|any} (see description)
 * @param arg* {any} additional arguments received by all subscriptions
 * @private
 */
Notifier.prototype.fire = function (e) {
    // first arg to delegate notifier should be an object with currentTarget
    var args     = toArray(arguments, 0, true),
        handle   = this.handle,
        ce       = handle.evt,
        sub      = handle.sub,
        thisObj  = sub.context,
        delegate = sub.filter,
        event    = e || {},
        ret;

    if (this.emitFacade) {
        if (!e || !e.preventDefault) {
            event = ce._getFacade();

            if (isObject(e) && !e.preventDefault) {
                Y.mix(event, e, true);
                args[0] = event;
            } else {
                args.unshift(event);
            }
        }

        event.type    = ce.type;
        event.details = args.slice();

        if (delegate) {
            event.container = ce.host;
        }
    } else if (delegate && isObject(e) && e.currentTarget) {
        args.shift();
    }

    sub.context = thisObj || event.currentTarget || ce.host;
    ret = ce.fire.apply(ce, args);
    sub.context = thisObj; // reset for future firing

    // to capture callbacks that return false to stopPropagation.
    // Useful for delegate implementations
    return ret;
};

/**
 * Manager object for synthetic event subscriptions to aggregate multiple synths on the same node without colliding with actual DOM subscription entries in the global map of DOM subscriptions.  Also facilitates proper cleanup on page unload.
 *
 * @class SynthRegistry
 * @constructor
 * @param el {HTMLElement} the DOM element
 * @param yuid {String} the yuid stamp for the element
 * @param key {String} the generated id token used to identify an event type +
 *                     element in the global DOM subscription map.
 * @private
 */
function SynthRegistry(el, yuid, key) {
    this.handles = [];
    this.el      = el;
    this.key     = key;
    this.domkey  = yuid;
}

SynthRegistry.prototype = {
    constructor: SynthRegistry,

    // A few object properties to fake the CustomEvent interface for page
    // unload cleanup.  DON'T TOUCH!
    type      : '_synth',
    fn        : noop,
    capture   : false,

    /**
     * Adds a subscription from the Notifier registry.
     *
     * @method register
     * @param handle {EventHandle} the subscription
     * @since 3.4.0
     */
    register: function (handle) {
        handle.evt.registry = this;
        this.handles.push(handle);
    },

    /**
     * Removes the subscription from the Notifier registry.
     *
     * @method _unregisterSub
     * @param sub {Subscription} the subscription
     * @since 3.4.0
     */
    unregister: function (sub) {
        var handles = this.handles,
            events = DOMMap[this.domkey],
            i;

        for (i = handles.length - 1; i >= 0; --i) {
            if (handles[i].sub === sub) {
                handles.splice(i, 1);
                break;
            }
        }

        // Clean up left over objects when there are no more subscribers.
        if (!handles.length) {
            delete events[this.key];
            if (!Y.Object.size(events)) {
                delete DOMMap[this.domkey];
            }
        }
    },

    /**
     * Used by the event system's unload cleanup process.  When navigating
     * away from the page, the event system iterates the global map of element
     * subscriptions and detaches everything using detachAll().  Normally,
     * the map is populated with custom events, so this object needs to
     * at least support the detachAll method to duck type its way to
     * cleanliness.
     *
     * @method detachAll
     * @private
     * @since 3.4.0
     */
    detachAll : function () {
        var handles = this.handles,
            i = handles.length;

        while (--i >= 0) {
            handles[i].detach();
        }
    }
};

/**
 * <p>Wrapper class for the integration of new events into the YUI event
 * infrastructure.  Don't instantiate this object directly, use
 * <code>Y.Event.define(type, config)</code>.  See that method for details.</p>
 *
 * <p>Properties that MAY or SHOULD be specified in the configuration are noted
 * below and in the description of <code>Y.Event.define</code>.</p>
 *
 * @class SyntheticEvent
 * @constructor
 * @param cfg {Object} Implementation pieces and configuration
 * @since 3.1.0
 * @in event-synthetic
 */
function SyntheticEvent() {
    this._init.apply(this, arguments);
}

Y.mix(SyntheticEvent, {
    Notifier: Notifier,
    SynthRegistry: SynthRegistry,

    /**
     * Returns the array of subscription handles for a node for the given event
     * type.  Passing true as the third argument will create a registry entry
     * in the event system's DOM map to host the array if one doesn't yet exist.
     *
     * @method getRegistry
     * @param node {Node} the node
     * @param type {String} the event
     * @param create {Boolean} create a registration entry to host a new array
     *                  if one doesn't exist.
     * @return {Array}
     * @static
     * @protected
     * @since 3.2.0
     */
    getRegistry: function (node, type, create) {
        var el     = node._node,
            yuid   = Y.stamp(el),
            key    = 'event:' + yuid + type + '_synth',
            events = DOMMap[yuid];
            
        if (create) {
            if (!events) {
                events = DOMMap[yuid] = {};
            }
            if (!events[key]) {
                events[key] = new SynthRegistry(el, yuid, key);
            }
        }

        return (events && events[key]) || null;
    },

    /**
     * Alternate <code>_delete()</code> method for the CustomEvent object
     * created to manage SyntheticEvent subscriptions.
     *
     * @method _deleteSub
     * @param sub {Subscription} the subscription to clean up
     * @private
     * @since 3.2.0
     */
    _deleteSub: function (sub) {
        if (sub && sub.fn) {
            var synth = this.eventDef,
                method = (sub.filter) ? 'detachDelegate' : 'detach';

            this.subscribers = {};
            this.subCount = 0;

            synth[method](sub.node, sub, this.notifier, sub.filter);
            this.registry.unregister(sub);

            delete sub.fn;
            delete sub.node;
            delete sub.context;
        }
    },

    prototype: {
        constructor: SyntheticEvent,

        /**
         * Construction logic for the event.
         *
         * @method _init
         * @protected
         */
        _init: function () {
            var config = this.publishConfig || (this.publishConfig = {});

            // The notification mechanism handles facade creation
            this.emitFacade = ('emitFacade' in config) ?
                                config.emitFacade :
                                true;
            config.emitFacade  = false;
        },

        /**
         * <p>Implementers MAY provide this method definition.</p>
         *
         * <p>Implement this function if the event supports a different
         * subscription signature.  This function is used by both
         * <code>on()</code> and <code>delegate()</code>.  The second parameter
         * indicates that the event is being subscribed via
         * <code>delegate()</code>.</p>
         *
         * <p>Implementations must remove extra arguments from the args list
         * before returning.  The required args for <code>on()</code>
         * subscriptions are</p>
         * <pre><code>[type, callback, target, context, argN...]</code></pre>
         *
         * <p>The required args for <code>delegate()</code>
         * subscriptions are</p>
         *
         * <pre><code>[type, callback, target, filter, context, argN...]</code></pre>
         *
         * <p>The return value from this function will be stored on the
         * subscription in the '_extra' property for reference elsewhere.</p>
         *
         * @method processArgs
         * @param args {Array} parmeters passed to Y.on(..) or Y.delegate(..)
         * @param delegate {Boolean} true if the subscription is from Y.delegate
         * @return {any}
         */
        processArgs: noop,

        /**
         * <p>Implementers MAY override this property.</p>
         *
         * <p>Whether to prevent multiple subscriptions to this event that are
         * classified as being the same.  By default, this means the subscribed
         * callback is the same function.  See the <code>subMatch</code>
         * method.  Setting this to true will impact performance for high volume
         * events.</p>
         *
         * @property preventDups
         * @type {Boolean}
         * @default false
         */
        //preventDups  : false,

        /**
         * <p>Implementers SHOULD provide this method definition.</p>
         *
         * Implementation logic for subscriptions done via <code>node.on(type,
         * fn)</code> or <code>Y.on(type, fn, target)</code>.  This
         * function should set up the monitor(s) that will eventually fire the
         * event.  Typically this involves subscribing to at least one DOM
         * event.  It is recommended to store detach handles from any DOM
         * subscriptions to make for easy cleanup in the <code>detach</code>
         * method.  Typically these handles are added to the <code>sub</code>
         * object.  Also for SyntheticEvents that leverage a single DOM
         * subscription under the hood, it is recommended to pass the DOM event
         * object to <code>notifier.fire(e)</code>.  (The event name on the
         * object will be updated).
         *
         * @method on
         * @param node {Node} the node the subscription is being applied to
         * @param sub {Subscription} the object to track this subscription
         * @param notifier {SyntheticEvent.Notifier} call notifier.fire(..) to
         *              trigger the execution of the subscribers
         */
        on: noop,

        /**
         * <p>Implementers SHOULD provide this method definition.</p>
         *
         * <p>Implementation logic for detaching subscriptions done via
         * <code>node.on(type, fn)</code>.  This function should clean up any
         * subscriptions made in the <code>on()</code> phase.</p>
         *
         * @method detach
         * @param node {Node} the node the subscription was applied to
         * @param sub {Subscription} the object tracking this subscription
         * @param notifier {SyntheticEvent.Notifier} the Notifier used to
         *              trigger the execution of the subscribers
         */
        detach: noop,

        /**
         * <p>Implementers SHOULD provide this method definition.</p>
         *
         * <p>Implementation logic for subscriptions done via
         * <code>node.delegate(type, fn, filter)</code> or
         * <code>Y.delegate(type, fn, container, filter)</code>.  Like with
         * <code>on()</code> above, this function should monitor the environment
         * for the event being fired, and trigger subscription execution by
         * calling <code>notifier.fire(e)</code>.</p>
         *
         * <p>This function receives a fourth argument, which is the filter
         * used to identify which Node's are of interest to the subscription.
         * The filter will be either a boolean function that accepts a target
         * Node for each hierarchy level as the event bubbles, or a selector
         * string.  To translate selector strings into filter functions, use
         * <code>Y.delegate.compileFilter(filter)</code>.</p>
         *
         * @method delegate
         * @param node {Node} the node the subscription is being applied to
         * @param sub {Subscription} the object to track this subscription
         * @param notifier {SyntheticEvent.Notifier} call notifier.fire(..) to
         *              trigger the execution of the subscribers
         * @param filter {String|Function} Selector string or function that
         *              accepts an event object and returns null, a Node, or an
         *              array of Nodes matching the criteria for processing.
         * @since 3.2.0
         */
        delegate       : noop,

        /**
         * <p>Implementers SHOULD provide this method definition.</p>
         *
         * <p>Implementation logic for detaching subscriptions done via
         * <code>node.delegate(type, fn, filter)</code> or
         * <code>Y.delegate(type, fn, container, filter)</code>.  This function
         * should clean up any subscriptions made in the
         * <code>delegate()</code> phase.</p>
         *
         * @method detachDelegate
         * @param node {Node} the node the subscription was applied to
         * @param sub {Subscription} the object tracking this subscription
         * @param notifier {SyntheticEvent.Notifier} the Notifier used to
         *              trigger the execution of the subscribers
         * @param filter {String|Function} Selector string or function that
         *              accepts an event object and returns null, a Node, or an
         *              array of Nodes matching the criteria for processing.
         * @since 3.2.0
         */
        detachDelegate : noop,

        /**
         * Sets up the boilerplate for detaching the event and facilitating the
         * execution of subscriber callbacks.
         *
         * @method _on
         * @param args {Array} array of arguments passed to
         *              <code>Y.on(...)</code> or <code>Y.delegate(...)</code>
         * @param delegate {Boolean} true if called from
         * <code>Y.delegate(...)</code>
         * @return {EventHandle} the detach handle for this subscription
         * @private
         * since 3.2.0
         */
        _on: function (args, delegate) {
            var handles  = [],
                originalArgs = args.slice(),
                extra    = this.processArgs(args, delegate),
                selector = args[2],
                method   = delegate ? 'delegate' : 'on',
                nodes, handle;

            // Can't just use Y.all because it doesn't support window (yet?)
            nodes = (isString(selector)) ?
                query(selector) :
                toArray(selector || Y.one(Y.config.win));

            if (!nodes.length && isString(selector)) {
                handle = Y.on('available', function () {
                    Y.mix(handle, Y[method].apply(Y, originalArgs), true);
                }, selector);

                return handle;
            }

            Y.Array.each(nodes, function (node) {
                var subArgs = args.slice(),
                    filter;

                node = Y.one(node);

                if (node) {
                    if (delegate) {
                        filter = subArgs.splice(3, 1)[0];
                    }

                    // (type, fn, el, thisObj, ...) => (fn, thisObj, ...)
                    subArgs.splice(0, 4, subArgs[1], subArgs[3]);

                    if (!this.preventDups ||
                        !this.getSubs(node, args, null, true))
                    {
                        handles.push(this._subscribe(node, method, subArgs, extra, filter));
                    }
                }
            }, this);

            return (handles.length === 1) ?
                handles[0] :
                new Y.EventHandle(handles);
        },

        /**
         * Creates a new Notifier object for use by this event's
         * <code>on(...)</code> or <code>delegate(...)</code> implementation
         * and register the custom event proxy in the DOM system for cleanup.
         *
         * @method _subscribe
         * @param node {Node} the Node hosting the event
         * @param method {String} "on" or "delegate"
         * @param args {Array} the subscription arguments passed to either
         *              <code>Y.on(...)</code> or <code>Y.delegate(...)</code>
         *              after running through <code>processArgs(args)</code> to
         *              normalize the argument signature
         * @param extra {any} Extra data parsed from
         *              <code>processArgs(args)</code>
         * @param filter {String|Function} the selector string or function
         *              filter passed to <code>Y.delegate(...)</code> (not
         *              present when called from <code>Y.on(...)</code>)
         * @return {EventHandle}
         * @private
         * @since 3.2.0
         */
        _subscribe: function (node, method, args, extra, filter) {
            var dispatcher = new Y.CustomEvent(this.type, this.publishConfig),
                handle     = dispatcher.on.apply(dispatcher, args),
                notifier   = new Notifier(handle, this.emitFacade),
                registry   = SyntheticEvent.getRegistry(node, this.type, true),
                sub        = handle.sub;

            sub.node   = node;
            sub.filter = filter;
            if (extra) {
                this.applyArgExtras(extra, sub);
            }

            Y.mix(dispatcher, {
                eventDef     : this,
                notifier     : notifier,
                host         : node,       // I forget what this is for
                currentTarget: node,       // for generating facades
                target       : node,       // for generating facades
                el           : node._node, // For category detach

                _delete      : SyntheticEvent._deleteSub
            }, true);

            handle.notifier = notifier;

            registry.register(handle);

            // Call the implementation's "on" or "delegate" method
            this[method](node, sub, notifier, filter);

            return handle;
        },

        /**
         * <p>Implementers MAY provide this method definition.</p>
         *
         * <p>Implement this function if you want extra data extracted during
         * processArgs to be propagated to subscriptions on a per-node basis.
         * That is to say, if you call <code>Y.on('xyz', fn, xtra, 'div')</code>
         * the data returned from processArgs will be shared
         * across the subscription objects for all the divs.  If you want each
         * subscription to receive unique information, do that processing
         * here.</p>
         *
         * <p>The default implementation adds the data extracted by processArgs
         * to the subscription object as <code>sub._extra</code>.</p>
         *
         * @method applyArgExtras
         * @param extra {any} Any extra data extracted from processArgs
         * @param sub {Subscription} the individual subscription
         */
        applyArgExtras: function (extra, sub) {
            sub._extra = extra;
        },

        /**
         * Removes the subscription(s) from the internal subscription dispatch
         * mechanism.  See <code>SyntheticEvent._deleteSub</code>.
         *
         * @method _detach
         * @param args {Array} The arguments passed to
         *                  <code>node.detach(...)</code>
         * @private
         * @since 3.2.0
         */
        _detach: function (args) {
            // Can't use Y.all because it doesn't support window (yet?)
            // TODO: Does Y.all support window now?
            var target = args[2],
                els    = (isString(target)) ?
                            query(target) : toArray(target),
                node, i, len, handles, j;

            // (type, fn, el, context, filter?) => (type, fn, context, filter?)
            args.splice(2, 1);

            for (i = 0, len = els.length; i < len; ++i) {
                node = Y.one(els[i]);

                if (node) {
                    handles = this.getSubs(node, args);

                    if (handles) {
                        for (j = handles.length - 1; j >= 0; --j) {
                            handles[j].detach();
                        }
                    }
                }
            }
        },

        /**
         * Returns the detach handles of subscriptions on a node that satisfy a
         * search/filter function.  By default, the filter used is the
         * <code>subMatch</code> method.
         *
         * @method getSubs
         * @param node {Node} the node hosting the event
         * @param args {Array} the array of original subscription args passed
         *              to <code>Y.on(...)</code> (before
         *              <code>processArgs</code>
         * @param filter {Function} function used to identify a subscription
         *              for inclusion in the returned array
         * @param first {Boolean} stop after the first match (used to check for
         *              duplicate subscriptions)
         * @return {EventHandle[]} detach handles for the matching subscriptions
         */
        getSubs: function (node, args, filter, first) {
            var registry = SyntheticEvent.getRegistry(node, this.type),
                handles  = [],
                allHandles, i, len, handle;

            if (registry) {
                allHandles = registry.handles;

                if (!filter) {
                    filter = this.subMatch;
                }

                for (i = 0, len = allHandles.length; i < len; ++i) {
                    handle = allHandles[i];
                    if (filter.call(this, handle.sub, args)) {
                        if (first) {
                            return handle;
                        } else {
                            handles.push(allHandles[i]);
                        }
                    }
                }
            }

            return handles.length && handles;
        },

        /**
         * <p>Implementers MAY override this to define what constitutes a
         * &quot;same&quot; subscription.  Override implementations should
         * consider the lack of a comparator as a match, so calling
         * <code>getSubs()</code> with no arguments will return all subs.</p>
         *
         * <p>Compares a set of subscription arguments against a Subscription
         * object to determine if they match.  The default implementation
         * compares the callback function against the second argument passed to
         * <code>Y.on(...)</code> or <code>node.detach(...)</code> etc.</p>
         *
         * @method subMatch
         * @param sub {Subscription} the existing subscription
         * @param args {Array} the calling arguments passed to
         *                  <code>Y.on(...)</code> etc.
         * @return {Boolean} true if the sub can be described by the args
         *                  present
         * @since 3.2.0
         */
        subMatch: function (sub, args) {
            // Default detach cares only about the callback matching
            return !args[1] || sub.fn === args[1];
        }
    }
}, true);

Y.SyntheticEvent = SyntheticEvent;

/**
 * <p>Defines a new event in the DOM event system.  Implementers are
 * responsible for monitoring for a scenario whereby the event is fired.  A
 * notifier object is provided to the functions identified below.  When the
 * criteria defining the event are met, call notifier.fire( [args] ); to
 * execute event subscribers.</p>
 *
 * <p>The first parameter is the name of the event.  The second parameter is a
 * configuration object which define the behavior of the event system when the
 * new event is subscribed to or detached from.  The methods that should be
 * defined in this configuration object are <code>on</code>,
 * <code>detach</code>, <code>delegate</code>, and <code>detachDelegate</code>.
 * You are free to define any other methods or properties needed to define your
 * event.  Be aware, however, that since the object is used to subclass
 * SyntheticEvent, you should avoid method names used by SyntheticEvent unless
 * your intention is to override the default behavior.</p>
 *
 * <p>This is a list of properties and methods that you can or should specify
 * in the configuration object:</p>
 *
 * <dl>
 *   <dt><code>on</code></dt>
 *       <dd><code>function (node, subscription, notifier)</code> The
 *       implementation logic for subscription.  Any special setup you need to
 *       do to create the environment for the event being fired--E.g. native
 *       DOM event subscriptions.  Store subscription related objects and
 *       state on the <code>subscription</code> object.  When the
 *       criteria have been met to fire the synthetic event, call
 *       <code>notifier.fire(e)</code>.  See Notifier's <code>fire()</code>
 *       method for details about what to pass as parameters.</dd>
 *
 *   <dt><code>detach</code></dt>
 *       <dd><code>function (node, subscription, notifier)</code> The
 *       implementation logic for cleaning up a detached subscription. E.g.
 *       detach any DOM subscriptions added in <code>on</code>.</dd>
 *
 *   <dt><code>delegate</code></dt>
 *       <dd><code>function (node, subscription, notifier, filter)</code> The
 *       implementation logic for subscription via <code>Y.delegate</code> or
 *       <code>node.delegate</code>.  The filter is typically either a selector
 *       string or a function.  You can use
 *       <code>Y.delegate.compileFilter(selectorString)</code> to create a
 *       filter function from a selector string if needed.  The filter function
 *       expects an event object as input and should output either null, a
 *       matching Node, or an array of matching Nodes.  Otherwise, this acts
 *       like <code>on</code> DOM event subscriptions.  Store subscription
 *       related objects and information on the <code>subscription</code>
 *       object.  When the criteria have been met to fire the synthetic event,
 *       call <code>notifier.fire(e)</code> as noted above.</dd>
 *
 *   <dt><code>detachDelegate</code></dt>
 *       <dd><code>function (node, subscription, notifier)</code> The
 *       implementation logic for cleaning up a detached delegate subscription.
 *       E.g. detach any DOM delegate subscriptions added in
 *       <code>delegate</code>.</dd>
 *
 *   <dt><code>publishConfig</code></dt>
 *       <dd>(Object) The configuration object that will be used to instantiate
 *       the underlying CustomEvent. See Notifier's <code>fire</code> method
 *       for details.</dd>
 *
 *   <dt><code>processArgs</code></dt
 *       <dd>
 *          <p><code>function (argArray, fromDelegate)</code> Optional method
 *          to extract any additional arguments from the subscription
 *          signature.  Using this allows <code>on</code> or
 *          <code>delegate</code> signatures like
 *          <code>node.on(&quot;hover&quot;, overCallback,
 *          outCallback)</code>.</p>
 *          <p>When processing an atypical argument signature, make sure the
 *          args array is returned to the normal signature before returning
 *          from the function.  For example, in the &quot;hover&quot; example
 *          above, the <code>outCallback</code> needs to be <code>splice</code>d
 *          out of the array.  The expected signature of the args array for
 *          <code>on()</code> subscriptions is:</p>
 *          <pre>
 *              <code>[type, callback, target, contextOverride, argN...]</code>
 *          </pre>
 *          <p>And for <code>delegate()</code>:</p>
 *          <pre>
 *              <code>[type, callback, target, filter, contextOverride, argN...]</code>
 *          </pre>
 *          <p>where <code>target</code> is the node the event is being
 *          subscribed for.  You can see these signatures documented for
 *          <code>Y.on()</code> and <code>Y.delegate()</code> respectively.</p>
 *          <p>Whatever gets returned from the function will be stored on the
 *          <code>subscription</code> object under
 *          <code>subscription._extra</code>.</p></dd>
 *   <dt><code>subMatch</code></dt>
 *       <dd>
 *           <p><code>function (sub, args)</code>  Compares a set of
 *           subscription arguments against a Subscription object to determine
 *           if they match.  The default implementation compares the callback
 *           function against the second argument passed to
 *           <code>Y.on(...)</code> or <code>node.detach(...)</code> etc.</p>
 *       </dd>
 * </dl>
 *
 * @method define
 * @param type {String} the name of the event
 * @param config {Object} the prototype definition for the new event (see above)
 * @param force {Boolean} override an existing event (use with caution)
 * @return {SyntheticEvent} the subclass implementation instance created to
 *              handle event subscriptions of this type
 * @static
 * @for Event
 * @since 3.1.0
 * @in event-synthetic
 */
Y.Event.define = function (type, config, force) {
    var eventDef, Impl, synth;

    if (type && type.type) {
        eventDef = type;
        force = config;
    } else if (config) {
        eventDef = Y.merge({ type: type }, config);
    }

    if (eventDef) {
        if (force || !Y.Node.DOM_EVENTS[eventDef.type]) {
            Impl = function () {
                SyntheticEvent.apply(this, arguments);
            };
            Y.extend(Impl, SyntheticEvent, eventDef);
            synth = new Impl();

            type = synth.type;

            Y.Node.DOM_EVENTS[type] = Y.Env.evt.plugins[type] = {
                eventDef: synth,

                on: function () {
                    return synth._on(toArray(arguments));
                },

                delegate: function () {
                    return synth._on(toArray(arguments), true);
                },

                detach: function () {
                    return synth._detach(toArray(arguments));
                }
            };

        }
    } else if (isString(type) || isArray(type)) {
        Y.Array.each(toArray(type), function (t) {
            Y.Node.DOM_EVENTS[t] = 1;
        });
    }

    return synth;
};


}, '3.4.1' ,{requires:['node-base', 'event-custom-complex']});
/*
YUI 3.4.1 (build 4118)
Copyright 2011 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add('event-key', function(Y) {

/**
 * Functionality to listen for one or more specific key combinations.
 * @module event
 * @submodule event-key
 */

var ALT      = "+alt",
    CTRL     = "+ctrl",
    META     = "+meta",
    SHIFT    = "+shift",

    trim     = Y.Lang.trim,

    eventDef = {
        KEY_MAP: {
            enter    : 13,
            esc      : 27,
            backspace: 8,
            tab      : 9,
            pageup   : 33,
            pagedown : 34
        },

        _typeRE: /^(up|down|press):/,
        _keysRE: /^(?:up|down|press):|\+(alt|ctrl|meta|shift)/g,

        processArgs: function (args) {
            var spec = args.splice(3,1)[0],
                mods = Y.Array.hash(spec.match(/\+(?:alt|ctrl|meta|shift)\b/g) || []),
                config = {
                    type: this._typeRE.test(spec) ? RegExp.$1 : null,
                    mods: mods,
                    keys: null
                },
                // strip type and modifiers from spec, leaving only keyCodes
                bits = spec.replace(this._keysRE, ''),
                chr, uc, lc, i;

            if (bits) {
                bits = bits.split(',');

                config.keys = {};

                // FIXME: need to support '65,esc' => keypress, keydown
                for (i = bits.length - 1; i >= 0; --i) {
                    chr = trim(bits[i]);

                    // catch sloppy filters, trailing commas, etc 'a,,'
                    if (!chr) {
                        continue;
                    }

                    // non-numerics are single characters or key names
                    if (+chr == chr) {
                        config.keys[chr] = mods;
                    } else {
                        lc = chr.toLowerCase();

                        if (this.KEY_MAP[lc]) {
                            config.keys[this.KEY_MAP[lc]] = mods;
                            // FIXME: '65,enter' defaults keydown for both
                            if (!config.type) {
                                config.type = "down"; // safest
                            }
                        } else {
                            uc = chr.charAt(0).toUpperCase();
                            lc = lc.charAt(0);

                            // FIXME: possibly stupid assumption that
                            // the keycode of the lower case == the
                            // charcode of the upper case
                            // a (key:65,char:97), A (key:65,char:65)
                            config.keys[uc.charCodeAt(0)] =
                                (lc !== uc && chr === uc) ?
                                    // upper case chars get +shift free
                                    Y.merge(mods, { "+shift": true }) :
                                    mods;
                        }
                    }
                }
            }

            if (!config.type) {
                config.type = "press";
            }

            return config;
        },

        on: function (node, sub, notifier, filter) {
            var spec   = sub._extra,
                type   = "key" + spec.type,
                keys   = spec.keys,
                method = (filter) ? "delegate" : "on";

            // Note: without specifying any keyCodes, this becomes a
            // horribly inefficient alias for 'keydown' (et al), but I
            // can't abort this subscription for a simple
            // Y.on('keypress', ...);
            // Please use keyCodes or just subscribe directly to keydown,
            // keyup, or keypress
            sub._detach = node[method](type, function (e) {
                var key = keys ? keys[e.keyCode] : spec.mods;

                if (key &&
                    (!key[ALT]   || (key[ALT]   && e.altKey)) &&
                    (!key[CTRL]  || (key[CTRL]  && e.ctrlKey)) &&
                    (!key[META]  || (key[META]  && e.metaKey)) &&
                    (!key[SHIFT] || (key[SHIFT] && e.shiftKey)))
                {
                    notifier.fire(e);
                }
            }, filter);
        },

        detach: function (node, sub, notifier) {
            sub._detach.detach();
        }
    };

eventDef.delegate = eventDef.on;
eventDef.detachDelegate = eventDef.detach;

/**
 * <p>Add a key listener.  The listener will only be notified if the
 * keystroke detected meets the supplied specification.  The
 * specification is a string that is defined as:</p>
 * 
 * <dl>
 *   <dt>spec</dt>
 *   <dd><code>[{type}:]{code}[,{code}]*</code></dd>
 *   <dt>type</dt>
 *   <dd><code>"down", "up", or "press"</code></dd>
 *   <dt>code</dt>
 *   <dd><code>{keyCode|character|keyName}[+{modifier}]*</code></dd>
 *   <dt>modifier</dt>
 *   <dd><code>"shift", "ctrl", "alt", or "meta"</code></dd>
 *   <dt>keyName</dt>
 *   <dd><code>"enter", "backspace", "esc", "tab", "pageup", or "pagedown"</code></dd>
 * </dl>
 *
 * <p>Examples:</p>
 * <ul>
 *   <li><code>Y.on("key", callback, "press:12,65+shift+ctrl", "#my-input");</code></li>
 *   <li><code>Y.delegate("key", preventSubmit, "enter", "#forms", "input[type=text]");</code></li>
 *   <li><code>Y.one("doc").on("key", viNav, "j,k,l,;");</code></li>
 * </ul>
 *   
 * @event key
 * @for YUI
 * @param type {string} 'key'
 * @param fn {function} the function to execute
 * @param id {string|HTMLElement|collection} the element(s) to bind
 * @param spec {string} the keyCode and modifier specification
 * @param o optional context object
 * @param args 0..n additional arguments to provide to the listener.
 * @return {Event.Handle} the detach handle
 */
Y.Event.define('key', eventDef, true);


}, '3.4.1' ,{requires:['event-synthetic']});
/*
YUI 3.4.1 (build 4118)
Copyright 2011 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add('event-mousewheel', function(Y) {

/**
 * Adds mousewheel event support
 * @module event
 * @submodule event-mousewheel
 */
var DOM_MOUSE_SCROLL = 'DOMMouseScroll',
    fixArgs = function(args) {
        var a = Y.Array(args, 0, true), target;
        if (Y.UA.gecko) {
            a[0] = DOM_MOUSE_SCROLL;
            target = Y.config.win;
        } else {
            target = Y.config.doc;
        }

        if (a.length < 3) {
            a[2] = target;
        } else {
            a.splice(2, 0, target);
        }

        return a;
    };

/**
 * Mousewheel event.  This listener is automatically attached to the
 * correct target, so one should not be supplied.  Mouse wheel 
 * direction and velocity is stored in the 'wheelDelta' field.
 * @event mousewheel
 * @param type {string} 'mousewheel'
 * @param fn {function} the callback to execute
 * @param context optional context object
 * @param args 0..n additional arguments to provide to the listener.
 * @return {EventHandle} the detach handle
 * @for YUI
 */
Y.Env.evt.plugins.mousewheel = {
    on: function() {
        return Y.Event._attach(fixArgs(arguments));
    },

    detach: function() {
        return Y.Event.detach.apply(Y.Event, fixArgs(arguments));
    }
};


}, '3.4.1' ,{requires:['node-base']});
/*
YUI 3.4.1 (build 4118)
Copyright 2011 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add('event-mouseenter', function(Y) {

/**
 * <p>Adds subscription and delegation support for mouseenter and mouseleave
 * events.  Unlike mouseover and mouseout, these events aren't fired from child
 * elements of a subscribed node.</p>
 *
 * <p>This avoids receiving three mouseover notifications from a setup like</p>
 *
 * <pre><code>div#container > p > a[href]</code></pre>
 *
 * <p>where</p>
 *
 * <pre><code>Y.one('#container').on('mouseover', callback)</code></pre>
 *
 * <p>When the mouse moves over the link, one mouseover event is fired from
 * #container, then when the mouse moves over the p, another mouseover event is
 * fired and bubbles to #container, causing a second notification, and finally
 * when the mouse moves over the link, a third mouseover event is fired and
 * bubbles to #container for a third notification.</p>
 *
 * <p>By contrast, using mouseenter instead of mouseover, the callback would be
 * executed only once when the mouse moves over #container.</p>
 *
 * @module event
 * @submodule event-mouseenter
 */

var domEventProxies = Y.Env.evt.dom_wrappers,
    contains = Y.DOM.contains,
    toArray = Y.Array,
    noop = function () {},

    config = {
        proxyType: "mouseover",
        relProperty: "fromElement",

        _notify: function (e, property, notifier) {
            var el = this._node,
                related = e.relatedTarget || e[property];

            if (el !== related && !contains(el, related)) {
                notifier.fire(new Y.DOMEventFacade(e, el,
                    domEventProxies['event:' + Y.stamp(el) + e.type]));
            }
        },

        on: function (node, sub, notifier) {
            var el = Y.Node.getDOMNode(node),
                args = [
                    this.proxyType,
                    this._notify,
                    el,
                    null,
                    this.relProperty,
                    notifier];

            sub.handle = Y.Event._attach(args, { facade: false });
            // node.on(this.proxyType, notify, null, notifier);
        },

        detach: function (node, sub) {
            sub.handle.detach();
        },

        delegate: function (node, sub, notifier, filter) {
            var el = Y.Node.getDOMNode(node),
                args = [
                    this.proxyType,
                    noop,
                    el,
                    null,
                    notifier
                ];

            sub.handle = Y.Event._attach(args, { facade: false });
            sub.handle.sub.filter = filter;
            sub.handle.sub.relProperty = this.relProperty;
            sub.handle.sub._notify = this._filterNotify;
        },

        _filterNotify: function (thisObj, args, ce) {
            args = args.slice();
            if (this.args) {
                args.push.apply(args, this.args);
            }

            var currentTarget = Y.delegate._applyFilter(this.filter, args, ce),
                related = args[0].relatedTarget || args[0][this.relProperty],
                e, i, len, ret, ct;

            if (currentTarget) {
                currentTarget = toArray(currentTarget);
                
                for (i = 0, len = currentTarget.length && (!e || !e.stopped); i < len; ++i) {
                    ct = currentTarget[0];
                    if (!contains(ct, related)) {
                        if (!e) {
                            e = new Y.DOMEventFacade(args[0], ct, ce);
                            e.container = Y.one(ce.el);
                        }
                        e.currentTarget = Y.one(ct);

                        // TODO: where is notifier? args? this.notifier?
                        ret = args[1].fire(e);

                        if (ret === false) {
                            break;
                        }
                    }
                }
            }

            return ret;
        },

        detachDelegate: function (node, sub) {
            sub.handle.detach();
        }
    };

Y.Event.define("mouseenter", config, true);
Y.Event.define("mouseleave", Y.merge(config, {
    proxyType: "mouseout",
    relProperty: "toElement"
}), true);


}, '3.4.1' ,{requires:['event-synthetic']});
/*
YUI 3.4.1 (build 4118)
Copyright 2011 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add('event-focus', function(Y) {

/**
 * Adds bubbling and delegation support to DOM events focus and blur.
 * 
 * @module event
 * @submodule event-focus
 */
var Event    = Y.Event,
    YLang    = Y.Lang,
    isString = YLang.isString,
    useActivate = YLang.isFunction(
        Y.DOM.create('<p onbeforeactivate=";"/>').onbeforeactivate);

function define(type, proxy, directEvent) {
    var nodeDataKey = '_' + type + 'Notifiers';

    Y.Event.define(type, {

        _attach: function (el, notifier, delegate) {
            if (Y.DOM.isWindow(el)) {
                return Event._attach([type, function (e) {
                    notifier.fire(e);
                }, el]);
            } else {
                return Event._attach(
                    [proxy, this._proxy, el, this, notifier, delegate],
                    { capture: true });
            }
        },

        _proxy: function (e, notifier, delegate) {
            var node       = e.target,
                notifiers  = node.getData(nodeDataKey),
                yuid       = Y.stamp(e.currentTarget._node),
                defer      = (useActivate || e.target !== e.currentTarget),
                sub        = notifier.handle.sub,
                filterArgs = [node, e].concat(sub.args || []),
                directSub;
                
            notifier.currentTarget = (delegate) ? node : e.currentTarget;
            notifier.container     = (delegate) ? e.currentTarget : null;

            if (!sub.filter || sub.filter.apply(node, filterArgs)) {
                // Maintain a list to handle subscriptions from nested
                // containers div#a>div#b>input #a.on(focus..) #b.on(focus..),
                // use one focus or blur subscription that fires notifiers from
                // #b then #a to emulate bubble sequence.
                if (!notifiers) {
                    notifiers = {};
                    node.setData(nodeDataKey, notifiers);

                    // only subscribe to the element's focus if the target is
                    // not the current target (
                    if (defer) {
                        directSub = Event._attach(
                            [directEvent, this._notify, node._node]).sub;
                        directSub.once = true;
                    }
                }

                if (!notifiers[yuid]) {
                    notifiers[yuid] = [];
                }

                notifiers[yuid].push(notifier);

                if (!defer) {
                    this._notify(e);
                }
            }
        },

        _notify: function (e, container) {
            var node        = e.currentTarget,
                notifiers   = node.getData(nodeDataKey),
                              // document.get('ownerDocument') returns null
                doc         = node.get('ownerDocument') || node,
                target      = node,
                nots        = [],
                notifier, i, len;

            if (notifiers) {
                // Walk up the parent axis until the origin node, 
                while (target && target !== doc) {
                    nots.push.apply(nots, notifiers[Y.stamp(target)] || []);
                    target = target.get('parentNode');
                }
                nots.push.apply(nots, notifiers[Y.stamp(doc)] || []);

                for (i = 0, len = nots.length; i < len; ++i) {
                    notifier = nots[i];
                    e.currentTarget = nots[i].currentTarget;

                    if (notifier.container) {
                        e.container = notifier.container;
                    }

                    notifier.fire(e);
                }

                // clear the notifications list (mainly for delegation)
                node.clearData(nodeDataKey);
            }
        },

        on: function (node, sub, notifier) {
            sub.onHandle = this._attach(node._node, notifier);
        },

        detach: function (node, sub) {
            sub.onHandle.detach();
        },

        delegate: function (node, sub, notifier, filter) {
            if (isString(filter)) {
                sub.filter = Y.delegate.compileFilter(filter);
            }

            sub.delegateHandle = this._attach(node._node, notifier, true);
        },

        detachDelegate: function (node, sub) {
            sub.delegateHandle.detach();
        }
    }, true);
}

// For IE, we need to defer to focusin rather than focus because
// `el.focus(); doSomething();` executes el.onbeforeactivate, el.onactivate,
// el.onfocusin, doSomething, then el.onfocus.  All others support capture
// phase focus, which executes before doSomething.  To guarantee consistent
// behavior for this use case, IE's direct subscriptions are made against
// focusin so subscribers will be notified before js following el.focus() is
// executed.
if (useActivate) {
    //     name     capture phase       direct subscription
    define("focus", "beforeactivate",   "focusin");
    define("blur",  "beforedeactivate", "focusout");
} else {
    define("focus", "focus", "focus");
    define("blur",  "blur",  "blur");
}


}, '3.4.1' ,{requires:['event-synthetic']});
/*
YUI 3.4.1 (build 4118)
Copyright 2011 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add('event-resize', function(Y) {

/**
 * Adds a window resize event that has its behavior normalized to fire at the
 * end of the resize rather than constantly during the resize.
 * @module event
 * @submodule event-resize
 */


/**
 * Old firefox fires the window resize event once when the resize action
 * finishes, other browsers fire the event periodically during the
 * resize.  This code uses timeout logic to simulate the Firefox 
 * behavior in other browsers.
 * @event windowresize
 * @for YUI
 */

var domEventProxies = Y.Env.evt.dom_wrappers,
    win = Y.config.win,
    key = 'event:' + Y.stamp(win) + 'resizenative',
    config;
    

Y.Event.define('windowresize', {

    on: (Y.UA.gecko && Y.UA.gecko < 1.91) ?
        function (node, sub, notifier) {
            sub._handle = Y.Event._attach(['resize', function (e) {
                notifier.fire(
                    new Y.DOMEventFacade(e, win, domEventProxies[key]));
            }], { facade: false });
        } :
        function (node, sub, notifier) {
            // interval bumped from 40 to 100ms as of 3.4.1
            var delay = Y.config.windowResizeDelay || 100;

            sub._handle = Y.Event._attach(['resize', function (e) {
                if (sub._timer) {
                    sub._timer.cancel();
                }

                sub._timer = Y.later(delay, Y, function () {
                    notifier.fire(
                        new Y.DOMEventFacade(e, win, domEventProxies[key]));
                });
            }], { facade: false });
        },

    detach: function (node, sub) {
        if (sub._timer) {
            sub._timer.cancel();
        }
        sub._handle.detach();
    }
    // delegate methods not defined because this only works for window
    // subscriptions, so...yeah.
});


}, '3.4.1' ,{requires:['event-synthetic']});
/*
YUI 3.4.1 (build 4118)
Copyright 2011 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add('event-hover', function(Y) {

/**
 * Adds support for a "hover" event.  The event provides a convenience wrapper
 * for subscribing separately to mouseenter and mouseleave.  The signature for
 * subscribing to the event is</p>
 *
 * <pre><code>node.on("hover", overFn, outFn);
 * node.delegate("hover", overFn, outFn, ".filterSelector");
 * Y.on("hover", overFn, outFn, ".targetSelector");
 * Y.delegate("hover", overFn, outFn, "#container", ".filterSelector");
 * </code></pre>
 *
 * <p>Additionally, for compatibility with a more typical subscription
 * signature, the following are also supported:</p>
 *
 * <pre><code>Y.on("hover", overFn, ".targetSelector", outFn);
 * Y.delegate("hover", overFn, "#container", outFn, ".filterSelector");
 * </code></pre>
 *
 * @module event
 * @submodule event-hover
 */
var isFunction = Y.Lang.isFunction,
    noop = function () {},
    conf = {
        processArgs: function (args) {
            // Y.delegate('hover', over, out, '#container', '.filter')
            // comes in as ['hover', over, out, '#container', '.filter'], but
            // node.delegate('hover', over, out, '.filter')
            // comes in as ['hover', over, containerEl, out, '.filter']
            var i = isFunction(args[2]) ? 2 : 3;

            return (isFunction(args[i])) ? args.splice(i,1)[0] : noop;
        },

        on: function (node, sub, notifier, filter) {
            var args = (sub.args) ? sub.args.slice() : [];

            args.unshift(null);

            sub._detach = node[(filter) ? "delegate" : "on"]({
                mouseenter: function (e) {
                    e.phase = 'over';
                    notifier.fire(e);
                },
                mouseleave: function (e) {
                    var thisObj = sub.context || this;

                    args[0] = e;

                    e.type = 'hover';
                    e.phase = 'out';
                    sub._extra.apply(thisObj, args);
                }
            }, filter);
        },

        detach: function (node, sub, notifier) {
            sub._detach.detach();
        }
    };

conf.delegate = conf.on;
conf.detachDelegate = conf.detach;

Y.Event.define("hover", conf);


}, '3.4.1' ,{requires:['event-mouseenter']});
/*
YUI 3.4.1 (build 4118)
Copyright 2011 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add('event-outside', function(Y) {

/**
 * Outside events are synthetic DOM events that fire when a corresponding native
 * or synthetic DOM event occurs outside a bound element.
 *
 * The following outside events are pre-defined by this module:
 * <ul>
 *   <li>blur</li>
 *   <li>change</li>
 *   <li>click</li>
 *   <li>dblclick</li>
 *   <li>focus</li>
 *   <li>keydown</li>
 *   <li>keypress</li>
 *   <li>keyup</li>
 *   <li>mousedown</li>
 *   <li>mousemove</li>
 *   <li>mouseout</li>
 *   <li>mouseover</li>
 *   <li>mouseup</li>
 *   <li>select</li>
 *   <li>submit</li>
 * </ul>
 *
 * Define new outside events with
 * <code>Y.Event.defineOutside(eventType);</code>.
 * By default, the created synthetic event name will be the name of the event
 * with "outside" appended (e.g. "click" becomes "clickoutside"). If you want
 * a different name for the created Event, pass it as a second argument like so:
 * <code>Y.Event.defineOutside(eventType, "yonderclick")</code>.
 *
 * @module event
 * @submodule event-outside
 */

// Outside events are pre-defined for each of these native DOM events
var nativeEvents = [
        'blur', 'change', 'click', 'dblclick', 'focus', 'keydown', 'keypress',
        'keyup', 'mousedown', 'mousemove', 'mouseout', 'mouseover', 'mouseup',
        'select', 'submit'
    ];

/**
 * Defines a new outside event to correspond with the given DOM event.
 *
 * By default, the created synthetic event name will be the name of the event
 * with "outside" appended (e.g. "click" becomes "clickoutside"). If you want
 * a different name for the created Event, pass it as a second argument like so:
 * <code>Y.Event.defineOutside(eventType, "yonderclick")</code>.
 *
 * @method Y.Event.defineOutside
 * @param {String} event DOM event
 * @param {String} name (optional) custom outside event name
 * @static
 */
Y.Event.defineOutside = function (event, name) {
    name = name || (event + 'outside');

    var config = {
    
        on: function (node, sub, notifier) {
            sub.handle = Y.one('doc').on(event, function(e) {
                if (this.isOutside(node, e.target)) {
                    e.currentTarget = node;
                    notifier.fire(e);
                }
            }, this);
        },
        
        detach: function (node, sub, notifier) {
            sub.handle.detach();
        },
        
        delegate: function (node, sub, notifier, filter) {
            sub.handle = Y.one('doc').delegate(event, function (e) {
                if (this.isOutside(node, e.target)) {
                    notifier.fire(e);
                }
            }, filter, this);
        },
        
        isOutside: function (node, target) {
            return target !== node && !target.ancestor(function (p) {
                    return p === node;
                });
        }
    };
    config.detachDelegate = config.detach;

    Y.Event.define(name, config);
};

// Define outside events for some common native DOM events
Y.Array.each(nativeEvents, function (event) {
    Y.Event.defineOutside(event);
});


}, '3.4.1' ,{requires:['event-synthetic']});
