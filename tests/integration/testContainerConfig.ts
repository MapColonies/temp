import { container } from 'tsyringe';
import config from 'config';
import { NoopTracer } from '@opentelemetry/api';
import { Tracing, Metrics } from '@map-colonies/telemetry';
import jsLogger from '@map-colonies/js-logger';
import { Services } from '../../src/common/constants';

function registerTestValues(): void {
  container.register(Services.CONFIG, { useValue: config });
  container.register(Services.LOGGER, { useValue: jsLogger({ enabled: false }) });

  container.register(Services.TRACER, { useValue: NoopTracer });

  const metrics = new Metrics('app_meter');
  const meter = metrics.start();
  container.register(Services.METER, { useValue: meter });
}

export { registerTestValues };
