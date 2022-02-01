import functools

from flask import Blueprint, render_template

bp = Blueprint('formations', __name__, url_prefix='/formations')

@bp.route('/formations')
def formations():
    return render_template('formations.html')