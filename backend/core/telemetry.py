import os
from fastapi import FastAPI
from opentelemetry import trace
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter
from opentelemetry.sdk.resources import Resource
from opentelemetry.instrumentation.fastapi import FastAPIInstrumentor

def setup_telemetry(app: FastAPI):
    # Initialize Resource with service name
    resource = Resource.create({"service.name": "scam-intelligence-core"})
    
    # Configure Tracer Provider
    provider = TracerProvider(resource=resource)
    trace.set_tracer_provider(provider)
    
    # Configure OTLP Exporter (sending traces to Grafana Cloud / OpenTelemetry Collector)
    otlp_endpoint = os.getenv("OTLP_ENDPOINT", "https://otlp-gateway-prod-us-east-0.grafana.net/otlp")
    otlp_username = os.getenv("GRAFANA_INSTANCE_ID", "")
    otlp_password = os.getenv("GRAFANA_API_KEY", "")
    
    if otlp_username and otlp_password:
        otlp_exporter = OTLPSpanExporter(
            endpoint=f"{otlp_endpoint}/v1/traces",
            headers=(
                ("Authorization", f"Basic {otlp_username}:{otlp_password}"),
            )
        )
        processor = BatchSpanProcessor(otlp_exporter)
        provider.add_span_processor(processor)
    else:
        print("WARNING: Grafana Cloud credentials missing. Traces will not be exported.")
        
    # Instrument FastAPI application
    FastAPIInstrumentor.instrument_app(app)
