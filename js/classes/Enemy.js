class Enemy extends Sprite {
    constructor({position = {x: 0, y: 0}, speed, health}) {
        super({position, imageSrc: 'img/saucer.png', frames: {max: 4}});
        this.width = 100;
        this.height = 100;
        this.waypointIndex = 0;
        this.center = {
            x: this.position.x + this.width / 2,
            y: this.position.y + this.height / 2
        };
        this.radius = 10;
        this.health = health;
        this.maxHealth = health;
        this.velocity = {
            x: 0,
            y: 0
        };
        this.speed = speed;
    }

    draw() {
        super.draw();

        //health bar
        c.fillStyle = 'red';
        c.fillRect(this.position.x, this.position.y - 15, this.width, 10);
        c.fillStyle = 'green';
        c.fillRect(this.position.x, this.position.y - 15, this.width * this.health / this.maxHealth, 10);
    }

    update() {
        this.draw();

        const waypoint = waypoints[this.waypointIndex];
        const yDistance = waypoint.y - this.center.y;
        const xDistance = waypoint.x - this.center.x;
        const angle = Math.atan2(yDistance, xDistance);

        this.velocity.x = Math.cos(angle) * this.speed;
        this.velocity.y = Math.sin(angle) * this.speed;

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        this.center = {
            x: this.position.x + this.width / 2,
            y: this.position.y + this.height / 2
        };

        if (Math.abs(Math.round(this.center.x) - Math.round(waypoint.x)) < Math.abs(this.velocity.x) && 
            Math.abs(Math.round(this.center.y) - Math.round(waypoint.y)) < Math.abs(this.velocity.y) &&
            this.waypointIndex < waypoints.length - 1) {
            this.waypointIndex++;
        }
    }
}