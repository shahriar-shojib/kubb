import { z } from 'zod'

export const appSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  organization: z.lazy(() => organizationSchema).optional(),
  status: z.string().optional(),
})

export const checkStatusSchema = z.object({
  name: z.string().optional(),
  output: z.string().optional(),
  status: z.string().optional(),
  updated_at: z.string().optional(),
})

export const createAppRequestSchema = z.object({
  app_name: z.string().optional(),
  enable_subdomains: z.boolean().optional(),
  network: z.string().optional(),
  org_slug: z.string().optional(),
})

export const createLeaseRequestSchema = z.object({
  description: z.string().optional(),
  ttl: z.number().int().describe('seconds lease will be valid').optional(),
})

export const createMachineRequestSchema = z.object({
  config: z
    .lazy(() => flyMachineConfigSchema)
    .describe('An object defining the Machine configuration')
    .optional(),
  lease_ttl: z.number().int().optional(),
  lsvd: z.boolean().optional(),
  name: z.string().describe('Unique name for this Machine. If omitted, one is generated for you').optional(),
  region: z
    .string()
    .describe('The target region. Omitting this param launches in the same region as your WireGuard peer connection (somewhere near you).')
    .optional(),
  skip_launch: z.boolean().optional(),
  skip_service_registration: z.boolean().optional(),
})

/**
 * @description Optional parameters
 */
export const createOidcTokenRequestSchema = z.object({ aud: z.string().optional() }).describe('Optional parameters')

export const createVolumeRequestSchema = z.object({
  compute: z.lazy(() => flyMachineGuestSchema).optional(),
  compute_image: z.string().optional(),
  encrypted: z.boolean().optional(),
  fstype: z.string().optional(),
  machines_only: z.boolean().optional(),
  name: z.string().optional(),
  region: z.string().optional(),
  require_unique_zone: z.boolean().optional(),
  size_gb: z.number().int().optional(),
  snapshot_id: z.string().describe('restore from snapshot').optional(),
  snapshot_retention: z.number().int().optional(),
  source_volume_id: z.string().describe('fork from remote volume').optional(),
})

export const errorResponseSchema = z.object({
  details: z.object({}).describe('Deprecated').optional(),
  error: z.string().optional(),
  status: z.lazy(() => mainStatusCodeSchema).optional(),
})

export const extendVolumeRequestSchema = z.object({ size_gb: z.number().int().optional() })

export const extendVolumeResponseSchema = z.object({ needs_restart: z.boolean().optional(), volume: z.lazy(() => volumeSchema).optional() })

export const imageRefSchema = z.object({
  digest: z.string().optional(),
  labels: z.object({}).catchall(z.string()).optional(),
  registry: z.string().optional(),
  repository: z.string().optional(),
  tag: z.string().optional(),
})

export const leaseSchema = z.object({
  description: z.string().describe('Description or reason for the Lease.').optional(),
  expires_at: z.number().int().describe('ExpiresAt is the unix timestamp in UTC to denote when the Lease will no longer be valid.').optional(),
  nonce: z.string().describe('Nonce is the unique ID autogenerated and associated with the Lease.').optional(),
  owner: z.string().describe('Owner is the user identifier which acquired the Lease.').optional(),
  version: z.string().describe('Machine version').optional(),
})

export const listAppSchema = z.object({
  id: z.string().optional(),
  machine_count: z.number().int().optional(),
  name: z.string().optional(),
  network: z.object({}).optional(),
})

export const listAppsResponseSchema = z.object({ apps: z.array(z.lazy(() => listAppSchema)).optional(), total_apps: z.number().int().optional() })

export const listenSocketSchema = z.object({ address: z.string().optional(), proto: z.string().optional() })

export const machineSchema = z.object({
  checks: z.array(z.lazy(() => checkStatusSchema)).optional(),
  config: z.lazy(() => flyMachineConfigSchema).optional(),
  created_at: z.string().optional(),
  events: z.array(z.lazy(() => machineEventSchema)).optional(),
  host_status: z.enum(['ok', 'unknown', 'unreachable']).optional(),
  id: z.string().optional(),
  image_ref: z.lazy(() => imageRefSchema).optional(),
  incomplete_config: z.lazy(() => flyMachineConfigSchema).optional(),
  instance_id: z.string().describe('InstanceID is unique for each version of the machine').optional(),
  name: z.string().optional(),
  nonce: z.string().describe('Nonce is only every returned on machine creation if a lease_duration was provided.').optional(),
  private_ip: z.string().describe('PrivateIP is the internal 6PN address of the machine.').optional(),
  region: z.string().optional(),
  state: z.string().optional(),
  updated_at: z.string().optional(),
})

export const machineEventSchema = z.object({
  id: z.string().optional(),
  request: z.object({}).optional(),
  source: z.string().optional(),
  status: z.string().optional(),
  timestamp: z.number().int().optional(),
  type: z.string().optional(),
})

export const machineExecRequestSchema = z.object({
  cmd: z.string().describe('Deprecated: use Command instead').optional(),
  command: z.array(z.string()).optional(),
  timeout: z.number().int().optional(),
})

export const machineVersionSchema = z.object({ user_config: z.lazy(() => flyMachineConfigSchema).optional(), version: z.string().optional() })

export const organizationSchema = z.object({ name: z.string().optional(), slug: z.string().optional() })

export const processStatSchema = z.object({
  command: z.string().optional(),
  cpu: z.number().int().optional(),
  directory: z.string().optional(),
  listen_sockets: z.array(z.lazy(() => listenSocketSchema)).optional(),
  pid: z.number().int().optional(),
  rss: z.number().int().optional(),
  rtime: z.number().int().optional(),
  stime: z.number().int().optional(),
})

export const signalRequestSchema = z.object({
  signal: z
    .enum(['SIGABRT', 'SIGALRM', 'SIGFPE', 'SIGHUP', 'SIGILL', 'SIGINT', 'SIGKILL', 'SIGPIPE', 'SIGQUIT', 'SIGSEGV', 'SIGTERM', 'SIGTRAP', 'SIGUSR1'])
    .optional(),
})

export const stopRequestSchema = z.object({ signal: z.string().optional(), timeout: z.lazy(() => flyDurationSchema).optional() })

export const updateMachineRequestSchema = z.object({
  config: z
    .lazy(() => flyMachineConfigSchema)
    .describe('An object defining the Machine configuration')
    .optional(),
  current_version: z.string().optional(),
  lease_ttl: z.number().int().optional(),
  lsvd: z.boolean().optional(),
  name: z.string().describe('Unique name for this Machine. If omitted, one is generated for you').optional(),
  region: z
    .string()
    .describe('The target region. Omitting this param launches in the same region as your WireGuard peer connection (somewhere near you).')
    .optional(),
  skip_launch: z.boolean().optional(),
  skip_service_registration: z.boolean().optional(),
})

export const updateVolumeRequestSchema = z.object({ auto_backup_enabled: z.boolean().optional(), snapshot_retention: z.number().int().optional() })

export const volumeSchema = z.object({
  attached_alloc_id: z.string().optional(),
  attached_machine_id: z.string().optional(),
  auto_backup_enabled: z.boolean().optional(),
  block_size: z.number().int().optional(),
  blocks: z.number().int().optional(),
  blocks_avail: z.number().int().optional(),
  blocks_free: z.number().int().optional(),
  created_at: z.string().optional(),
  encrypted: z.boolean().optional(),
  fstype: z.string().optional(),
  host_status: z.enum(['ok', 'unknown', 'unreachable']).optional(),
  id: z.string().optional(),
  name: z.string().optional(),
  region: z.string().optional(),
  size_gb: z.number().int().optional(),
  snapshot_retention: z.number().int().optional(),
  state: z.string().optional(),
  zone: z.string().optional(),
})

export const volumeSnapshotSchema = z.object({
  created_at: z.string().optional(),
  digest: z.string().optional(),
  id: z.string().optional(),
  retention_days: z.number().int().optional(),
  size: z.number().int().optional(),
  status: z.string().optional(),
})

export const flyDnsConfigSchema = z.object({
  dns_forward_rules: z.array(z.lazy(() => flyDnsForwardRuleSchema)).optional(),
  hostname: z.string().optional(),
  hostname_fqdn: z.string().optional(),
  nameservers: z.array(z.string()).optional(),
  options: z.array(z.lazy(() => flyDnsOptionSchema)).optional(),
  searches: z.array(z.string()).optional(),
  skip_registration: z.boolean().optional(),
})

export const flyDurationSchema = z.object({ 'time.Duration': z.number().int().optional() })

/**
 * @description EnvVar defines an environment variable to be populated from a machine field, env_var
 */
export const flyEnvFromSchema = z
  .object({
    env_var: z
      .string()
      .describe(
        'EnvVar is required and is the name of the environment variable that will be set from the\nsecret. It must be a valid environment variable name.',
      )
      .optional(),
    field_ref: z
      .enum(['id', 'version', 'app_name', 'private_ip', 'region', 'image'])
      .describe('FieldRef selects a field of the Machine: supports id, version, app_name, private_ip, region, image.')
      .optional(),
  })
  .describe('EnvVar defines an environment variable to be populated from a machine field, env_var')

/**
 * @description A file that will be written to the Machine. One of RawValue or SecretName must be set.
 */
export const flyFileSchema = z
  .object({
    guest_path: z
      .string()
      .describe('GuestPath is the path on the machine where the file will be written and must be an absolute path.\nFor example: /full/path/to/file.json')
      .optional(),
    mode: z.number().int().describe('Mode bits used to set permissions on this file as accepted by chmod(2).').optional(),
    raw_value: z.string().describe('The base64 encoded string of the file contents.').optional(),
    secret_name: z.string().describe('The name of the secret that contains the base64 encoded file contents.').optional(),
  })
  .describe('A file that will be written to the Machine. One of RawValue or SecretName must be set.')

export const flyHttpOptionsSchema = z.object({
  compress: z.boolean().optional(),
  h2_backend: z.boolean().optional(),
  headers_read_timeout: z.number().int().optional(),
  idle_timeout: z.number().int().optional(),
  response: z.lazy(() => flyHttpResponseOptionsSchema).optional(),
})

export const flyHttpResponseOptionsSchema = z.object({ headers: z.object({}).catchall(z.object({})).optional(), pristine: z.boolean().optional() })

/**
 * @description An optional object that defines one or more named checks. The key for each check is the check name.
 */
export const flyMachineCheckSchema = z
  .object({
    grace_period: z
      .lazy(() => flyDurationSchema)
      .describe('The time to wait after a VM starts before checking its health')
      .optional(),
    headers: z.array(z.lazy(() => flyMachineHttpHeaderSchema)).optional(),
    interval: z
      .lazy(() => flyDurationSchema)
      .describe('The time between connectivity checks')
      .optional(),
    kind: z.enum(['informational', 'readiness']).describe('Kind of the check (informational, readiness)').optional(),
    method: z.string().describe('For http checks, the HTTP method to use to when making the request').optional(),
    path: z.string().describe('For http checks, the path to send the request to').optional(),
    port: z.number().int().describe('The port to connect to, often the same as internal_port').optional(),
    protocol: z.string().describe('For http checks, whether to use http or https').optional(),
    timeout: z
      .lazy(() => flyDurationSchema)
      .describe('The maximum time a connection can take before being reported as failing its health check')
      .optional(),
    tls_server_name: z.string().describe('If the protocol is https, the hostname to use for TLS certificate validation').optional(),
    tls_skip_verify: z.boolean().describe('For http checks with https protocol, whether or not to verify the TLS certificate').optional(),
    type: z.string().describe('tcp or http').optional(),
  })
  .describe('An optional object that defines one or more named checks. The key for each check is the check name.')

export const flyMachineConfigSchema = z.object({
  auto_destroy: z.boolean().describe('Optional boolean telling the Machine to destroy itself once it\u2019s complete (default false)').optional(),
  checks: z
    .object({})
    .catchall(z.lazy(() => flyMachineCheckSchema))
    .optional(),
  disable_machine_autostart: z.boolean().describe('Deprecated: use Service.Autostart instead').optional(),
  dns: z.lazy(() => flyDnsConfigSchema).optional(),
  env: z.object({}).catchall(z.string()).describe('An object filled with key/value pairs to be set as environment variables').optional(),
  files: z.array(z.lazy(() => flyFileSchema)).optional(),
  guest: z.lazy(() => flyMachineGuestSchema).optional(),
  image: z.string().describe('The docker image to run').optional(),
  init: z.lazy(() => flyMachineInitSchema).optional(),
  metadata: z.object({}).catchall(z.string()).optional(),
  metrics: z.lazy(() => flyMachineMetricsSchema).optional(),
  mounts: z.array(z.lazy(() => flyMachineMountSchema)).optional(),
  processes: z.array(z.lazy(() => flyMachineProcessSchema)).optional(),
  restart: z.lazy(() => flyMachineRestartSchema).optional(),
  schedule: z.string().optional(),
  services: z.array(z.lazy(() => flyMachineServiceSchema)).optional(),
  size: z.string().describe('Deprecated: use Guest instead').optional(),
  standbys: z
    .array(z.string())
    .describe('Standbys enable a machine to be a standby for another. In the event of a hardware failure,\nthe standby machine will be started.')
    .optional(),
  statics: z.array(z.lazy(() => flyStaticSchema)).optional(),
  stop_config: z.lazy(() => flyStopConfigSchema).optional(),
})

export const flyMachineGuestSchema = z.object({
  cpu_kind: z.string().optional(),
  cpus: z.number().int().optional(),
  gpu_kind: z.string().optional(),
  gpus: z.number().int().optional(),
  host_dedication_id: z.string().optional(),
  kernel_args: z.array(z.string()).optional(),
  memory_mb: z.number().int().optional(),
})

/**
 * @description For http checks, an array of objects with string field Name and array of strings field Values. The key/value pairs specify header and header values that will get passed with the check call.
 */
export const flyMachineHttpHeaderSchema = z
  .object({ name: z.string().describe('The header name').optional(), values: z.array(z.string()).describe('The header value').optional() })
  .describe(
    'For http checks, an array of objects with string field Name and array of strings field Values. The key/value pairs specify header and header values that will get passed with the check call.',
  )

export const flyMachineInitSchema = z.object({
  cmd: z.array(z.string()).optional(),
  entrypoint: z.array(z.string()).optional(),
  exec: z.array(z.string()).optional(),
  kernel_args: z.array(z.string()).optional(),
  swap_size_mb: z.number().int().optional(),
  tty: z.boolean().optional(),
})

export const flyMachineMetricsSchema = z.object({ path: z.string().optional(), port: z.number().int().optional() })

export const flyMachineMountSchema = z.object({
  add_size_gb: z.number().int().optional(),
  encrypted: z.boolean().optional(),
  extend_threshold_percent: z.number().int().optional(),
  name: z.string().optional(),
  path: z.string().optional(),
  size_gb: z.number().int().optional(),
  size_gb_limit: z.number().int().optional(),
  volume: z.string().optional(),
})

export const flyMachinePortSchema = z.object({
  end_port: z.number().int().optional(),
  force_https: z.boolean().optional(),
  handlers: z.array(z.string()).optional(),
  http_options: z.lazy(() => flyHttpOptionsSchema).optional(),
  port: z.number().int().optional(),
  proxy_proto_options: z.lazy(() => flyProxyProtoOptionsSchema).optional(),
  start_port: z.number().int().optional(),
  tls_options: z.lazy(() => flyTlsOptionsSchema).optional(),
})

export const flyMachineProcessSchema = z.object({
  cmd: z.array(z.string()).optional(),
  entrypoint: z.array(z.string()).optional(),
  env: z.object({}).catchall(z.string()).optional(),
  env_from: z
    .array(z.lazy(() => flyEnvFromSchema))
    .describe('EnvFrom can be provided to set environment variables from machine fields.')
    .optional(),
  exec: z.array(z.string()).optional(),
  ignore_app_secrets: z
    .boolean()
    .describe(
      'IgnoreAppSecrets can be set to true to ignore the secrets for the App the Machine belongs to\nand only use the secrets provided at the process level. The default/legacy behavior is to use\nthe secrets provided at the App level.',
    )
    .optional(),
  secrets: z
    .array(z.lazy(() => flyMachineSecretSchema))
    .describe(
      'Secrets can be provided at the process level to explicitly indicate which secrets should be\nused for the process. If not provided, the secrets provided at the machine level will be used.',
    )
    .optional(),
  user: z.string().optional(),
})

/**
 * @description The Machine restart policy defines whether and how flyd restarts a Machine after its main process exits. See https://fly.io/docs/machines/guides-examples/machine-restart-policy/.
 */
export const flyMachineRestartSchema = z
  .object({
    gpu_bid_price: z.number().describe('GPU bid price for spot Machines.').optional(),
    max_retries: z
      .number()
      .int()
      .describe('When policy is on-failure, the maximum number of times to attempt to restart the Machine before letting it stop.')
      .optional(),
    policy: z
      .enum(['no', 'always', 'on-failure', 'spot-price'])
      .describe(
        '* no - Never try to restart a Machine automatically when its main process exits, whether that\u2019s on purpose or on a crash.\n* always - Always restart a Machine automatically and never let it enter a stopped state, even when the main process exits cleanly.\n* on-failure - Try up to MaxRetries times to automatically restart the Machine if it exits with a non-zero exit code. Default when no explicit policy is set, and for Machines with schedules.\n* spot-price - Starts the Machine only when there is capacity and the spot price is less than or equal to the bid price.',
      )
      .optional(),
  })
  .describe(
    'The Machine restart policy defines whether and how flyd restarts a Machine after its main process exits. See https://fly.io/docs/machines/guides-examples/machine-restart-policy/.',
  )

/**
 * @description A Secret needing to be set in the environment of the Machine. env_var is required
 */
export const flyMachineSecretSchema = z
  .object({
    env_var: z
      .string()
      .describe(
        'EnvVar is required and is the name of the environment variable that will be set from the\nsecret. It must be a valid environment variable name.',
      )
      .optional(),
    name: z
      .string()
      .describe('Name is optional and when provided is used to reference a secret name where the EnvVar is\ndifferent from what was set as the secret name.')
      .optional(),
  })
  .describe('A Secret needing to be set in the environment of the Machine. env_var is required')

export const flyMachineServiceSchema = z.object({
  autostart: z.boolean().optional(),
  autostop: z
    .enum(['off', 'stop', 'suspend'])
    .describe(
      'Accepts a string (new format) or a boolean (old format). For backward compatibility with older clients, the API continues to use booleans for "off" and "stop" in responses.\n* "off" or false - Do not autostop the Machine.\n* "stop" or true - Automatically stop the Machine.\n* "suspend" - Automatically suspend the Machine, falling back to a full stop if this is not possible.',
    )
    .optional(),
  checks: z.array(z.lazy(() => flyMachineCheckSchema)).optional(),
  concurrency: z.lazy(() => flyMachineServiceConcurrencySchema).optional(),
  force_instance_description: z.string().optional(),
  force_instance_key: z.string().optional(),
  internal_port: z.number().int().optional(),
  min_machines_running: z.number().int().optional(),
  ports: z.array(z.lazy(() => flyMachinePortSchema)).optional(),
  protocol: z.string().optional(),
})

export const flyMachineServiceConcurrencySchema = z.object({
  hard_limit: z.number().int().optional(),
  soft_limit: z.number().int().optional(),
  type: z.string().optional(),
})

export const flyProxyProtoOptionsSchema = z.object({ version: z.string().optional() })

export const flyStaticSchema = z.object({
  guest_path: z.string(),
  index_document: z.string().optional(),
  tigris_bucket: z.string().optional(),
  url_prefix: z.string(),
})

export const flyStopConfigSchema = z.object({ signal: z.string().optional(), timeout: z.lazy(() => flyDurationSchema).optional() })

export const flyTlsOptionsSchema = z.object({
  alpn: z.array(z.string()).optional(),
  default_self_signed: z.boolean().optional(),
  versions: z.array(z.string()).optional(),
})

export const flyDnsForwardRuleSchema = z.object({ addr: z.string().optional(), basename: z.string().optional() })

export const flyDnsOptionSchema = z.object({ name: z.string().optional(), value: z.string().optional() })

export const flydv1ExecResponseSchema = z.object({
  exit_code: z.number().int().optional(),
  exit_signal: z.number().int().optional(),
  stderr: z.string().optional(),
  stdout: z.string().optional(),
})

export const mainStatusCodeSchema = z.enum(['unknown', 'insufficient_capacity'])

export const appsListQueryParamsSchema = z.object({ org_slug: z.string().describe("The org slug, or 'personal', to filter apps") })

/**
 * @description OK
 */
export const appsList200Schema = z.lazy(() => listAppsResponseSchema)

/**
 * @description OK
 */
export const appsListQueryResponseSchema = z.lazy(() => listAppsResponseSchema)

/**
 * @description Created
 */
export const appsCreate201Schema = z.any()

/**
 * @description Bad Request
 */
export const appsCreate400Schema = z.lazy(() => errorResponseSchema)

/**
 * @description App body
 */
export const appsCreateMutationRequestSchema = z.lazy(() => createAppRequestSchema)

export const appsCreateMutationResponseSchema = z.any()

export const appsShowPathParamsSchema = z.object({ app_name: z.string().describe('Fly App Name') })

/**
 * @description OK
 */
export const appsShow200Schema = z.lazy(() => appSchema)

/**
 * @description OK
 */
export const appsShowQueryResponseSchema = z.lazy(() => appSchema)

export const appsDeletePathParamsSchema = z.object({ app_name: z.string().describe('Fly App Name') })

/**
 * @description Accepted
 */
export const appsDelete202Schema = z.any()

export const appsDeleteMutationResponseSchema = z.any()

export const machinesListPathParamsSchema = z.object({ app_name: z.string().describe('Fly App Name') })

export const machinesListQueryParamsSchema = z
  .object({ include_deleted: z.boolean().describe('Include deleted machines').optional(), region: z.string().describe('Region filter').optional() })
  .optional()

/**
 * @description OK
 */
export const machinesList200Schema = z.array(z.lazy(() => machineSchema))

/**
 * @description OK
 */
export const machinesListQueryResponseSchema = z.array(z.lazy(() => machineSchema))

export const machinesCreatePathParamsSchema = z.object({ app_name: z.string().describe('Fly App Name') })

/**
 * @description OK
 */
export const machinesCreate200Schema = z.lazy(() => machineSchema)

/**
 * @description Create machine request
 */
export const machinesCreateMutationRequestSchema = z.lazy(() => createMachineRequestSchema)

/**
 * @description OK
 */
export const machinesCreateMutationResponseSchema = z.lazy(() => machineSchema)

export const machinesShowPathParamsSchema = z.object({ app_name: z.string().describe('Fly App Name'), machine_id: z.string().describe('Machine ID') })

/**
 * @description OK
 */
export const machinesShow200Schema = z.lazy(() => machineSchema)

/**
 * @description OK
 */
export const machinesShowQueryResponseSchema = z.lazy(() => machineSchema)

export const machinesUpdatePathParamsSchema = z.object({ app_name: z.string().describe('Fly App Name'), machine_id: z.string().describe('Machine ID') })

/**
 * @description OK
 */
export const machinesUpdate200Schema = z.lazy(() => machineSchema)

/**
 * @description Bad Request
 */
export const machinesUpdate400Schema = z.lazy(() => errorResponseSchema)

/**
 * @description Request body
 */
export const machinesUpdateMutationRequestSchema = z.lazy(() => updateMachineRequestSchema)

/**
 * @description OK
 */
export const machinesUpdateMutationResponseSchema = z.lazy(() => machineSchema)

export const machinesDeletePathParamsSchema = z.object({ app_name: z.string().describe('Fly App Name'), machine_id: z.string().describe('Machine ID') })

export const machinesDeleteQueryParamsSchema = z.object({ force: z.boolean().describe("Force kill the machine if it's running").optional() }).optional()

/**
 * @description OK
 */
export const machinesDelete200Schema = z.any()

export const machinesDeleteMutationResponseSchema = z.any()

export const machinesCordonPathParamsSchema = z.object({ app_name: z.string().describe('Fly App Name'), machine_id: z.string().describe('Machine ID') })

/**
 * @description OK
 */
export const machinesCordon200Schema = z.any()

export const machinesCordonMutationResponseSchema = z.any()

export const machinesListEventsPathParamsSchema = z.object({ app_name: z.string().describe('Fly App Name'), machine_id: z.string().describe('Machine ID') })

/**
 * @description OK
 */
export const machinesListEvents200Schema = z.array(z.lazy(() => machineEventSchema))

/**
 * @description OK
 */
export const machinesListEventsQueryResponseSchema = z.array(z.lazy(() => machineEventSchema))

export const machinesExecPathParamsSchema = z.object({ app_name: z.string().describe('Fly App Name'), machine_id: z.string().describe('Machine ID') })

/**
 * @description stdout, stderr, exit code, and exit signal are returned
 */
export const machinesExec200Schema = z.lazy(() => flydv1ExecResponseSchema)

/**
 * @description Bad Request
 */
export const machinesExec400Schema = z.lazy(() => errorResponseSchema)

/**
 * @description Request body
 */
export const machinesExecMutationRequestSchema = z.lazy(() => machineExecRequestSchema)

/**
 * @description stdout, stderr, exit code, and exit signal are returned
 */
export const machinesExecMutationResponseSchema = z.lazy(() => flydv1ExecResponseSchema)

export const machinesShowLeasePathParamsSchema = z.object({ app_name: z.string().describe('Fly App Name'), machine_id: z.string().describe('Machine ID') })

/**
 * @description OK
 */
export const machinesShowLease200Schema = z.lazy(() => leaseSchema)

/**
 * @description OK
 */
export const machinesShowLeaseQueryResponseSchema = z.lazy(() => leaseSchema)

export const machinesCreateLeasePathParamsSchema = z.object({ app_name: z.string().describe('Fly App Name'), machine_id: z.string().describe('Machine ID') })

export const machinesCreateLeaseHeaderParamsSchema = z
  .object({ 'fly-machine-lease-nonce': z.string().describe('Existing lease nonce to refresh by ttl, empty or non-existent to create a new lease').optional() })
  .optional()

/**
 * @description OK
 */
export const machinesCreateLease200Schema = z.lazy(() => leaseSchema)

/**
 * @description Request body
 */
export const machinesCreateLeaseMutationRequestSchema = z.lazy(() => createLeaseRequestSchema)

/**
 * @description OK
 */
export const machinesCreateLeaseMutationResponseSchema = z.lazy(() => leaseSchema)

export const machinesReleaseLeasePathParamsSchema = z.object({ app_name: z.string().describe('Fly App Name'), machine_id: z.string().describe('Machine ID') })

export const machinesReleaseLeaseHeaderParamsSchema = z.object({ 'fly-machine-lease-nonce': z.string().describe('Existing lease nonce') })

/**
 * @description OK
 */
export const machinesReleaseLease200Schema = z.any()

export const machinesReleaseLeaseMutationResponseSchema = z.any()

export const machinesShowMetadataPathParamsSchema = z.object({ app_name: z.string().describe('Fly App Name'), machine_id: z.string().describe('Machine ID') })

/**
 * @description OK
 */
export const machinesShowMetadata200Schema = z.object({}).catchall(z.string())

/**
 * @description OK
 */
export const machinesShowMetadataQueryResponseSchema = z.object({}).catchall(z.string())

export const machinesUpdateMetadataPathParamsSchema = z.object({
  app_name: z.string().describe('Fly App Name'),
  machine_id: z.string().describe('Machine ID'),
  key: z.string().describe('Metadata Key'),
})

/**
 * @description No Content
 */
export const machinesUpdateMetadata204Schema = z.any()

/**
 * @description Bad Request
 */
export const machinesUpdateMetadata400Schema = z.lazy(() => errorResponseSchema)

export const machinesUpdateMetadataMutationResponseSchema = z.any()

export const machinesDeleteMetadataPathParamsSchema = z.object({
  app_name: z.string().describe('Fly App Name'),
  machine_id: z.string().describe('Machine ID'),
  key: z.string().describe('Metadata Key'),
})

/**
 * @description No Content
 */
export const machinesDeleteMetadata204Schema = z.any()

export const machinesDeleteMetadataMutationResponseSchema = z.any()

export const machinesListProcessesPathParamsSchema = z.object({ app_name: z.string().describe('Fly App Name'), machine_id: z.string().describe('Machine ID') })

export const machinesListProcessesQueryParamsSchema = z
  .object({ sort_by: z.string().describe('Sort by').optional(), order: z.string().describe('Order').optional() })
  .optional()

/**
 * @description OK
 */
export const machinesListProcesses200Schema = z.array(z.lazy(() => processStatSchema))

/**
 * @description Bad Request
 */
export const machinesListProcesses400Schema = z.lazy(() => errorResponseSchema)

/**
 * @description OK
 */
export const machinesListProcessesQueryResponseSchema = z.array(z.lazy(() => processStatSchema))

export const machinesRestartPathParamsSchema = z.object({ app_name: z.string().describe('Fly App Name'), machine_id: z.string().describe('Machine ID') })

export const machinesRestartQueryParamsSchema = z
  .object({
    timeout: z.string().describe('Restart timeout as a Go duration string or number of seconds').optional(),
    signal: z.string().describe('UNIX signal name').optional(),
  })
  .optional()

/**
 * @description OK
 */
export const machinesRestart200Schema = z.any()

/**
 * @description Bad Request
 */
export const machinesRestart400Schema = z.lazy(() => errorResponseSchema)

export const machinesRestartMutationResponseSchema = z.any()

export const machinesSignalPathParamsSchema = z.object({ app_name: z.string().describe('Fly App Name'), machine_id: z.string().describe('Machine ID') })

/**
 * @description OK
 */
export const machinesSignal200Schema = z.any()

/**
 * @description Bad Request
 */
export const machinesSignal400Schema = z.lazy(() => errorResponseSchema)

/**
 * @description Request body
 */
export const machinesSignalMutationRequestSchema = z.lazy(() => signalRequestSchema)

export const machinesSignalMutationResponseSchema = z.any()

export const machinesStartPathParamsSchema = z.object({ app_name: z.string().describe('Fly App Name'), machine_id: z.string().describe('Machine ID') })

/**
 * @description OK
 */
export const machinesStart200Schema = z.any()

export const machinesStartMutationResponseSchema = z.any()

export const machinesStopPathParamsSchema = z.object({ app_name: z.string().describe('Fly App Name'), machine_id: z.string().describe('Machine ID') })

/**
 * @description OK
 */
export const machinesStop200Schema = z.any()

/**
 * @description Bad Request
 */
export const machinesStop400Schema = z.lazy(() => errorResponseSchema)

/**
 * @description Optional request body
 */
export const machinesStopMutationRequestSchema = z.lazy(() => stopRequestSchema)

export const machinesStopMutationResponseSchema = z.any()

export const machinesSuspendPathParamsSchema = z.object({ app_name: z.string().describe('Fly App Name'), machine_id: z.string().describe('Machine ID') })

/**
 * @description OK
 */
export const machinesSuspend200Schema = z.any()

export const machinesSuspendMutationResponseSchema = z.any()

export const machinesUncordonPathParamsSchema = z.object({ app_name: z.string().describe('Fly App Name'), machine_id: z.string().describe('Machine ID') })

/**
 * @description OK
 */
export const machinesUncordon200Schema = z.any()

export const machinesUncordonMutationResponseSchema = z.any()

export const machinesListVersionsPathParamsSchema = z.object({ app_name: z.string().describe('Fly App Name'), machine_id: z.string().describe('Machine ID') })

/**
 * @description OK
 */
export const machinesListVersions200Schema = z.array(z.lazy(() => machineVersionSchema))

/**
 * @description OK
 */
export const machinesListVersionsQueryResponseSchema = z.array(z.lazy(() => machineVersionSchema))

export const machinesWaitPathParamsSchema = z.object({ app_name: z.string().describe('Fly App Name'), machine_id: z.string().describe('Machine ID') })

export const machinesWaitQueryParamsSchema = z
  .object({
    instance_id: z.string().describe('26-character Machine version ID').optional(),
    timeout: z.number().int().describe('wait timeout. default 60s').optional(),
    state: z.enum(['started', 'stopped', 'suspended', 'destroyed']).describe('desired state').optional(),
  })
  .optional()

/**
 * @description OK
 */
export const machinesWait200Schema = z.any()

/**
 * @description Bad Request
 */
export const machinesWait400Schema = z.lazy(() => errorResponseSchema)

export const machinesWaitQueryResponseSchema = z.any()

export const volumesListPathParamsSchema = z.object({ app_name: z.string().describe('Fly App Name') })

/**
 * @description OK
 */
export const volumesList200Schema = z.array(z.lazy(() => volumeSchema))

/**
 * @description OK
 */
export const volumesListQueryResponseSchema = z.array(z.lazy(() => volumeSchema))

export const volumesCreatePathParamsSchema = z.object({ app_name: z.string().describe('Fly App Name') })

/**
 * @description OK
 */
export const volumesCreate200Schema = z.lazy(() => volumeSchema)

/**
 * @description Request body
 */
export const volumesCreateMutationRequestSchema = z.lazy(() => createVolumeRequestSchema)

/**
 * @description OK
 */
export const volumesCreateMutationResponseSchema = z.lazy(() => volumeSchema)

export const volumesGetByIdPathParamsSchema = z.object({ app_name: z.string().describe('Fly App Name'), volume_id: z.string().describe('Volume ID') })

/**
 * @description OK
 */
export const volumesGetById200Schema = z.lazy(() => volumeSchema)

/**
 * @description OK
 */
export const volumesGetByIdQueryResponseSchema = z.lazy(() => volumeSchema)

export const volumesUpdatePathParamsSchema = z.object({ app_name: z.string().describe('Fly App Name'), volume_id: z.string().describe('Volume ID') })

/**
 * @description OK
 */
export const volumesUpdate200Schema = z.lazy(() => volumeSchema)

/**
 * @description Bad Request
 */
export const volumesUpdate400Schema = z.lazy(() => errorResponseSchema)

/**
 * @description Request body
 */
export const volumesUpdateMutationRequestSchema = z.lazy(() => updateVolumeRequestSchema)

/**
 * @description OK
 */
export const volumesUpdateMutationResponseSchema = z.lazy(() => volumeSchema)

export const volumeDeletePathParamsSchema = z.object({ app_name: z.string().describe('Fly App Name'), volume_id: z.string().describe('Volume ID') })

/**
 * @description OK
 */
export const volumeDelete200Schema = z.lazy(() => volumeSchema)

/**
 * @description OK
 */
export const volumeDeleteMutationResponseSchema = z.lazy(() => volumeSchema)

export const volumesExtendPathParamsSchema = z.object({ app_name: z.string().describe('Fly App Name'), volume_id: z.string().describe('Volume ID') })

/**
 * @description OK
 */
export const volumesExtend200Schema = z.lazy(() => extendVolumeResponseSchema)

/**
 * @description Request body
 */
export const volumesExtendMutationRequestSchema = z.lazy(() => extendVolumeRequestSchema)

/**
 * @description OK
 */
export const volumesExtendMutationResponseSchema = z.lazy(() => extendVolumeResponseSchema)

export const volumesListSnapshotsPathParamsSchema = z.object({ app_name: z.string().describe('Fly App Name'), volume_id: z.string().describe('Volume ID') })

/**
 * @description OK
 */
export const volumesListSnapshots200Schema = z.array(z.lazy(() => volumeSnapshotSchema))

/**
 * @description OK
 */
export const volumesListSnapshotsQueryResponseSchema = z.array(z.lazy(() => volumeSnapshotSchema))

export const createVolumeSnapshotPathParamsSchema = z.object({ app_name: z.string().describe('Fly App Name'), volume_id: z.string().describe('Volume ID') })

/**
 * @description OK
 */
export const createVolumeSnapshot200Schema = z.any()

export const createVolumeSnapshotMutationResponseSchema = z.any()

/**
 * @description KMS token
 */
export const tokensRequestKms200Schema = z.string()

/**
 * @description KMS token
 */
export const tokensRequestKmsMutationResponseSchema = z.string()

/**
 * @description OIDC token
 */
export const tokensRequestOidc200Schema = z.string()

/**
 * @description Bad Request
 */
export const tokensRequestOidc400Schema = z.lazy(() => errorResponseSchema)

/**
 * @description Optional request body
 */
export const tokensRequestOidcMutationRequestSchema = z.lazy(() => createOidcTokenRequestSchema)

/**
 * @description OIDC token
 */
export const tokensRequestOidcMutationResponseSchema = z.string()
