namespace.module('bot.vector', function (exports, require) {

    var log = namespace.bot.log;

    function dist(a, b) {
        return Math.round(Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2)));
    }

    function getDistances(base, targets) {
        // log.error('vector, base: %s, targets: %s', JSON.stringify(base), JSON.stringify(targets));
        return _.map(targets, function(target) { return dist(base, target); });
    }

    // a and b must be array-like and they must be the same length
    function equal(a, b) {
        for (var i = a.length; i--;) {
            if (a[i] !== b[i]) {
                return false;
            }
        }
        return true;
    }

    function closer(cur, dest, rate, stopDist) {
        var diff = [dest[0] - cur[0], dest[1] - cur[1]];
        var distance = dist(cur, dest);
        if (distance - rate < stopDist) {
            rate = distance - stopDist;
        }
        var ratio = 1 - (distance - rate) / distance;
        return [Math.round(cur[0] + diff[0] * ratio), Math.round(cur[1] + diff[1] * ratio)];
    }

    exports.extend({
        getDistances: getDistances,
        dist: dist,
        equal: equal,
        closer: closer
    });
});


namespace.module('bot.utils', function (exports, require) {

    var log = namespace.bot.log;

    function applyAffixes(startVal, mods) {
        //console.log("applyAffixes", startVal, mods);
        var mores, adds, splits, modtype, amt;
        mores = 1;
        adds = startVal;
        _.each(mods, function(mod) {
            splits = mod.split(' ');
            modtype = splits[0];
            amt = parseFloat(splits[1]);
            if (modtype === 'added') {
                adds += amt;
            } else if (modtype === 'more') {
                mores *= (1 + 0.01 * amt);
            } else {
                log.error('Improperly formatted affix %s', mod);
                throw('up');
                console.log(mods, startVal, mores, adds);
            }
        });
        //console.log("returning", adds*mores, adds, mores);
        return adds * mores;
    }

    function applyAllAffixes(t, stats, affixDict) {
        stats = _.filter(stats, function(stat) { return stat in affixDict});
        _.each(stats, function(stat) { t[stat] = applyAffixes(t[stat], affixDict[stat]); });
    }

    function affixesToAffDict(affixes) {
        var affixDict = {};
        for (var i = 0; i < affixes.length; i++) {
            var affix = affixes[i].split(' ');
            var stat = affix[0];
            var mod = affix.slice(1).join(' ');
            if (affixDict[stat]) {
                affixDict[stat].push(mod);
            } else {
                affixDict[stat] = [mod];
            }
        }
        return affixDict;
    }

    exports.extend({
        applyAllAffixes: applyAllAffixes,
        affixesToAffDict: affixesToAffDict
    });

});


namespace.module('bot.messages', function (exports, require) {

    var log = namespace.bot.log;

    var MessageModel = Backbone.Model.extend({
        defaults: function() {
            return {
                expires: new Date().getTime() + 10000,
                message: ''
            };
        },
    });

    var MessageCollection = Backbone.Collection.extend({
        model: MessageModel,
        comparator: 'expires',

        prune: function() {
            var now = new Date().getTime();
            this.remove(this.filter(function(model) { return model.get('expires') < now; }));
            log.info('message collection prune, data: %s', JSON.stringify(this.pluck('message')));
        },
    });

    function Messages() {
        this.msgs = new MessageCollection();
    }

    Messages.prototype.send = function(message, expiresIn) {
        var obj = {message: message};
        if (expiresIn !== undefined) {
            obj.expires = new Date().getTime() + expiresIn;
        }
        this.msgs.add(new MessageModel(obj));
        log.error(this.msgs.length);
        this.msgs.prune();
        log.error(this.msgs.length);
    }

    window.msgs = new Messages();
});
