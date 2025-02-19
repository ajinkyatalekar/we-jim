from supabase import create_client
from app.config.settings import get_settings

settings = get_settings()

supabase = create_client(
    settings.supabase_url,
    settings.supabase_key
)