namespace.module('bot.main', function (exports, require) {

    var log = namespace.bot.log;
    var inv = namespace.bot.inv;
    var menu = namespace.bot.menu;
    var entity = namespace.bot.entity;
    var zone = namespace.bot.zone;
    var views = namespace.bot.views;

    function onReady() {
        window.gevents = _.extend({}, Backbone.Events);

        localStorage.clear();

        log.info('onReady');
        var gameModel = new GameModel();

        var gameView = new namespace.bot.window.GameView({}, gameModel);// find out initialization args, pick who gets what
        var m = new menu.TabView();

        //var invMenuView = new inv.InvMenuView({model: gameModel.inv});

        // var invModel = new inv.InvModel();
        // var invMenuView = new inv.InvMenuView({model: invModel});
        // var craftMenuView = new inv.CraftMenuView({model: invModel});
        // var lvlupMenuView = new inv.LvlupMenuView({model: invModel});

        $(window).on('keypress', function(event) {
            var SPACE = 32;
            if (event.keyCode == SPACE) {
                gameModel.toggle();
            }
        });
    }

    var GameModel = Backbone.Model.extend({
        defaults: function() {
            return {
                running: false,
                inZone: false
            }
        },

        initialize: function() {
            //this.inv = new inv.InvModel();
            //this.inv = new inv.ItemCollection({}, []);

            //this.recipes = new inv.RecipeCollection();

            this.inv = new inv.ItemCollection();
            this.char = new entity.newChar(this.inv);
            this.zone = new zone.ZoneManager({char: this.char});

            this.recipesView = new inv.CraftItemCollectionView({collection: this.inv.recipes});
            this.invView = new inv.InvItemCollectionView({collection: this.inv});
            this.headerView = views.newHeaderView(this.char, this.inv, this.zone);

            this.lastTime = new Date().getTime();
            this.zonesCleared = 0;
            this.deaths = 0;
        },

        start: function() {
            log.info('start');
            this.lastTime = new Date().getTime();
            this.set({running: true});
            requestAnimFrame(this.tick.bind(this));
        },

        pause: function() {
            log.info('pause');
            this.set({running: false});
        },

        toggle: function() {
            log.info('toggle');
            if (this.get('running')) {
                this.pause();
            } else {
                this.start();
            }
        },

        stop: function() {
            this.set({running: false});
            this.char.revive();
            //this.zone = undefined;  // this.zone.destroy();
            this.set('inZone', false);
        },

        tick: function() {
            log.debug('begin tick');
            if (!this.get('inZone') || !this.char.get('hp') || this.char.get('hp') <= 0 || this.zone.done()) {
                log.info('Getting new zone, recomputing char attrs');
                this.char.computeAttrs();
                this.char.revive();
                this.zone.newZone('spooky dungeon', this.char.get('level'));
                this.set('inZone', true);
            }

            var thisTime = new Date().getTime();
            var room = this.zone.getCurrentRoom();
            var dt = 10;
            for (var t = this.lastTime; t < thisTime; t += dt) {
            //for (var t = this.lastTime; t < thisTime; t += thisTime - this.lastTime) {
                log.debug('tick calling update functions');
                // pass new time to char and all monsters
                this.char.update(dt);
                room.monsters.update(dt);

                this.char.tryDoStuff(room);

                if (this.zone.done()) {
                    this.zonesCleared++;
                    this.set('inZone', false);
                    break;
                }

                if (this.zone.nextRoom()) {
                    room = this.zone.getCurrentRoom();
                }

                // TODO: trydostuff is called once per monster regardless of if char is alive
                //   not really a bug, but imperfect behavior
                room.monsters.tryDoStuff(room);

                if (!this.char.isAlive()) {
                    this.deaths++;
                    break;
                }
            }

            this.lastTime = thisTime;

            Events.mark('vis');

            Events.triggerAll(window.gevents);

            if (this.get('running')) {
                requestAnimFrame(this.tick.bind(this));
            }
        },
    });

    exports.extend({
        onReady: onReady,
        GameModel: GameModel
    });

});
